"""Config flow and options flow for Hermes.

All configuration happens from the UI: no hand-written YAML, no raw Jinja2
exposed (reply templates use simple placeholders).

Nodes are picked from the devices exposed by the base `meshtastic` integration
(a DeviceSelector), so the user never has to look up or type a numeric node id.
Each Meshtastic node device carries the identifier `(meshtastic, "<node_num>")`,
which we resolve back to the integer node number stored in the entry.
"""

from __future__ import annotations

import uuid
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr, selector

from .const import (
    CMD_AUTH_OVERRIDE,
    CMD_ID,
    CMD_KEYWORD,
    CMD_MATCH_TYPE,
    CMD_REPLY_TEMPLATE,
    CMD_REPLY_TO,
    CMD_SERVICE,
    CMD_SERVICE_DATA,
    CMD_TARGET,
    CONF_AUTHORIZED_NODES,
    CONF_CHANNEL_INDEX,
    CONF_COMMANDS,
    CONF_GATEWAY_NODE_ID,
    CONF_INITIAL_DELAY,
    CONF_MODE,
    CONF_PART_DELAY,
    DEFAULT_INITIAL_DELAY,
    DEFAULT_PART_DELAY,
    DOMAIN,
    MATCH_EXACT,
    MATCH_TYPES,
    MESHTASTIC_DOMAIN,
    MODE_CHANNEL,
    MODES,
    REPLY_CHANNEL,
    REPLY_TARGETS,
)

# Form-only field keys (transient): resolved to node numbers before storing.
FIELD_GATEWAY_DEVICE = "gateway_device"
FIELD_AUTH_DEVICES = "authorized_devices"
FIELD_AUTH_EXTRA = "authorized_extra"


def _parse_nodes(raw: str) -> list[int]:
    """Convert an 'id, id, ...' string into a list of ints, validating it."""
    nodes: list[int] = []
    for token in (raw or "").replace(";", ",").split(","):
        token = token.strip()
        if not token:
            continue
        try:
            nodes.append(int(token))
        except ValueError as err:
            raise vol.Invalid(f"invalid node id: {token!r}") from err
    return nodes


def _format_nodes(nodes: list[int] | None) -> str:
    """Format a list of node ids as a string for form prefill."""
    return ", ".join(str(n) for n in (nodes or []))


def _device_to_node(hass: HomeAssistant, device_id: str) -> int | None:
    """Resolve a device_id to its Meshtastic node number, or None."""
    device = dr.async_get(hass).async_get(device_id)
    if device is None:
        return None
    for domain, value in device.identifiers:
        if domain == MESHTASTIC_DOMAIN:
            try:
                return int(value)
            except (TypeError, ValueError):
                return None
    return None


def _node_to_device(hass: HomeAssistant, node_id: int) -> str | None:
    """Reverse lookup: node number to device_id (for form prefill), or None."""
    reg = dr.async_get(hass)
    target = (MESHTASTIC_DOMAIN, str(node_id))
    for device in reg.devices.values():
        if target in device.identifiers:
            return device.id
    return None


def _resolve_nodes(
    hass: HomeAssistant, device_ids: list[str] | None, extra_text: str
) -> list[int]:
    """Combine picked devices and the optional manual list into node numbers.

    Raises vol.Invalid if the manual list contains a non-integer token.
    """
    nodes: set[int] = set()
    for device_id in device_ids or []:
        node = _device_to_node(hass, device_id)
        if node is not None:
            nodes.add(node)
    nodes.update(_parse_nodes(extra_text))
    return sorted(nodes)


def _split_for_prefill(
    hass: HomeAssistant, node_ids: list[int] | None
) -> tuple[list[str], str]:
    """Split stored node ids into (known device_ids, leftover manual string)."""
    devices: list[str] = []
    extras: list[int] = []
    for node in node_ids or []:
        device_id = _node_to_device(hass, int(node))
        if device_id:
            devices.append(device_id)
        else:
            extras.append(int(node))
    return devices, _format_nodes(extras)


def _select(options: list[str], translation_key: str) -> selector.SelectSelector:
    """Dropdown SelectSelector with options translated via `translation_key`."""
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=options,
            mode=selector.SelectSelectorMode.DROPDOWN,
            translation_key=translation_key,
        )
    )


def _meshtastic_device(multiple: bool) -> selector.DeviceSelector:
    """DeviceSelector limited to devices from the base `meshtastic` integration."""
    return selector.DeviceSelector(
        selector.DeviceSelectorConfig(
            integration=MESHTASTIC_DOMAIN, multiple=multiple
        )
    )


class HermesConfigFlow(ConfigFlow, domain=DOMAIN):
    """Config flow: create a gateway + channel/DM entry."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Initial step: pick the gateway device, mode, starting whitelist."""
        errors: dict[str, str] = {}

        if user_input is not None:
            gateway = _device_to_node(self.hass, user_input[FIELD_GATEWAY_DEVICE])
            if gateway is None:
                errors[FIELD_GATEWAY_DEVICE] = "gateway_not_meshtastic"

            authorized: list[int] = []
            try:
                authorized = _resolve_nodes(
                    self.hass,
                    user_input.get(FIELD_AUTH_DEVICES),
                    user_input.get(FIELD_AUTH_EXTRA, ""),
                )
            except vol.Invalid:
                errors[FIELD_AUTH_EXTRA] = "invalid_node_list"
            else:
                if not authorized:
                    errors[FIELD_AUTH_DEVICES] = "empty_whitelist"

            if not errors:
                mode = user_input[CONF_MODE]
                channel = (
                    user_input.get(CONF_CHANNEL_INDEX)
                    if mode == MODE_CHANNEL
                    else None
                )
                # unique_id per gateway+mode+channel combination: enables
                # multi-instance (different channels = different entries).
                await self.async_set_unique_id(f"{gateway}_{mode}_{channel}")
                self._abort_if_unique_id_configured()

                data: dict[str, Any] = {
                    CONF_GATEWAY_NODE_ID: gateway,
                    CONF_MODE: mode,
                    CONF_AUTHORIZED_NODES: authorized,
                }
                if channel is not None:
                    data[CONF_CHANNEL_INDEX] = channel

                title = (
                    f"Hermes · channel {channel} · gw {gateway}"
                    if mode == MODE_CHANNEL
                    else f"Hermes · DM · gw {gateway}"
                )
                return self.async_create_entry(title=title, data=data)

        schema = vol.Schema(
            {
                vol.Required(FIELD_GATEWAY_DEVICE): _meshtastic_device(False),
                vol.Required(CONF_MODE, default=MODE_CHANNEL): _select(
                    MODES, "mode"
                ),
                vol.Optional(CONF_CHANNEL_INDEX, default=0): vol.All(
                    vol.Coerce(int), vol.Range(min=0, max=7)
                ),
                vol.Optional(FIELD_AUTH_DEVICES): _meshtastic_device(True),
                vol.Optional(FIELD_AUTH_EXTRA, default=""): str,
            }
        )
        return self.async_show_form(
            step_id="user",
            data_schema=self.add_suggested_values_to_schema(schema, user_input or {}),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return HermesOptionsFlow()


class HermesOptionsFlow(OptionsFlow):
    """Menu-based options flow: command CRUD, default whitelist, timing."""

    _edit_id: str | None = None

    # --- Main menu ---------------------------------------------------------

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Main menu."""
        return self.async_show_menu(
            step_id="init",
            menu_options=[
                "add_command",
                "select_command",
                "remove_command",
                "whitelist",
                "timing",
            ],
        )

    # --- Commands ----------------------------------------------------------

    def _commands(self) -> list[dict[str, Any]]:
        return list(self.config_entry.options.get(CONF_COMMANDS, []))

    def _command_schema(self, existing: dict[str, Any] | None = None) -> vol.Schema:
        """Command form schema (shared between add and edit)."""
        schema = vol.Schema(
            {
                vol.Required(CMD_KEYWORD): str,
                vol.Required(CMD_MATCH_TYPE, default=MATCH_EXACT): _select(
                    MATCH_TYPES, "match_type"
                ),
                vol.Required(CMD_SERVICE): selector.TextSelector(),
                vol.Optional(CMD_TARGET): selector.TargetSelector(),
                vol.Optional(CMD_REPLY_TEMPLATE, default=""): selector.TextSelector(
                    selector.TextSelectorConfig(multiline=True)
                ),
                vol.Required(CMD_REPLY_TO, default=REPLY_CHANNEL): _select(
                    REPLY_TARGETS, "reply_to"
                ),
                vol.Optional(CMD_SERVICE_DATA): selector.ObjectSelector(),
                vol.Optional(FIELD_AUTH_DEVICES): _meshtastic_device(True),
                vol.Optional(FIELD_AUTH_EXTRA, default=""): str,
            }
        )
        prefill: dict[str, Any] = dict(existing or {})
        if existing is not None:
            devices, extra = _split_for_prefill(
                self.hass, existing.get(CMD_AUTH_OVERRIDE)
            )
            prefill[FIELD_AUTH_DEVICES] = devices
            prefill[FIELD_AUTH_EXTRA] = extra
        return self.add_suggested_values_to_schema(schema, prefill)

    def _build_command(
        self, user_input: dict[str, Any], command_id: str
    ) -> dict[str, Any]:
        """Normalize form input into a command object. Raises vol.Invalid."""
        override = _resolve_nodes(
            self.hass,
            user_input.get(FIELD_AUTH_DEVICES),
            user_input.get(FIELD_AUTH_EXTRA, ""),
        )
        command = {
            CMD_ID: command_id,
            CMD_KEYWORD: user_input[CMD_KEYWORD],
            CMD_MATCH_TYPE: user_input[CMD_MATCH_TYPE],
            CMD_SERVICE: user_input[CMD_SERVICE],
            CMD_REPLY_TEMPLATE: user_input.get(CMD_REPLY_TEMPLATE, ""),
            CMD_REPLY_TO: user_input[CMD_REPLY_TO],
        }
        if user_input.get(CMD_TARGET):
            command[CMD_TARGET] = user_input[CMD_TARGET]
        if user_input.get(CMD_SERVICE_DATA):
            command[CMD_SERVICE_DATA] = user_input[CMD_SERVICE_DATA]
        if override:
            command[CMD_AUTH_OVERRIDE] = override
        return command

    async def _save_commands(
        self, commands: list[dict[str, Any]]
    ) -> ConfigFlowResult:
        """Persist the command list preserving the other options."""
        options = {**self.config_entry.options, CONF_COMMANDS: commands}
        return self.async_create_entry(title="", data=options)

    async def async_step_add_command(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Add a new command."""
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                command = self._build_command(user_input, uuid.uuid4().hex)
            except vol.Invalid:
                errors[FIELD_AUTH_EXTRA] = "invalid_node_list"
            else:
                return await self._save_commands([*self._commands(), command])

        return self.async_show_form(
            step_id="add_command",
            data_schema=self._command_schema(user_input),
            errors=errors,
        )

    async def async_step_select_command(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Pick which command to edit."""
        commands = self._commands()
        if not commands:
            return await self.async_step_init()

        if user_input is not None:
            self._edit_id = user_input[CMD_ID]
            return await self.async_step_edit_command()

        options = [
            selector.SelectOptionDict(
                value=cmd[CMD_ID],
                label=f"{cmd.get(CMD_KEYWORD, '?')} ({cmd.get(CMD_SERVICE, '?')})",
            )
            for cmd in commands
        ]
        return self.async_show_form(
            step_id="select_command",
            data_schema=vol.Schema(
                {
                    vol.Required(CMD_ID): selector.SelectSelector(
                        selector.SelectSelectorConfig(
                            options=options,
                            mode=selector.SelectSelectorMode.DROPDOWN,
                        )
                    )
                }
            ),
        )

    async def async_step_edit_command(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit the selected command."""
        commands = self._commands()
        existing = next(
            (c for c in commands if c[CMD_ID] == self._edit_id), None
        )
        if existing is None:
            return await self.async_step_init()

        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                updated = self._build_command(user_input, self._edit_id)
            except vol.Invalid:
                errors[FIELD_AUTH_EXTRA] = "invalid_node_list"
            else:
                new_list = [
                    updated if c[CMD_ID] == self._edit_id else c for c in commands
                ]
                return await self._save_commands(new_list)

        return self.async_show_form(
            step_id="edit_command",
            data_schema=self._command_schema(user_input or existing),
            errors=errors,
        )

    async def async_step_remove_command(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Remove one or more commands."""
        commands = self._commands()
        if not commands:
            return await self.async_step_init()

        if user_input is not None:
            to_remove = set(user_input.get(CMD_ID, []))
            kept = [c for c in commands if c[CMD_ID] not in to_remove]
            return await self._save_commands(kept)

        options = [
            selector.SelectOptionDict(
                value=cmd[CMD_ID],
                label=f"{cmd.get(CMD_KEYWORD, '?')} ({cmd.get(CMD_SERVICE, '?')})",
            )
            for cmd in commands
        ]
        return self.async_show_form(
            step_id="remove_command",
            data_schema=vol.Schema(
                {
                    vol.Required(CMD_ID, default=[]): selector.SelectSelector(
                        selector.SelectSelectorConfig(
                            options=options,
                            multiple=True,
                            mode=selector.SelectSelectorMode.LIST,
                        )
                    )
                }
            ),
        )

    # --- Default whitelist -------------------------------------------------

    async def async_step_whitelist(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit the default whitelist by picking Meshtastic devices."""
        errors: dict[str, str] = {}
        current = self.config_entry.options.get(
            CONF_AUTHORIZED_NODES,
            self.config_entry.data.get(CONF_AUTHORIZED_NODES, []),
        )

        if user_input is not None:
            try:
                nodes = _resolve_nodes(
                    self.hass,
                    user_input.get(FIELD_AUTH_DEVICES),
                    user_input.get(FIELD_AUTH_EXTRA, ""),
                )
            except vol.Invalid:
                errors[FIELD_AUTH_EXTRA] = "invalid_node_list"
            else:
                if not nodes:
                    errors[FIELD_AUTH_DEVICES] = "empty_whitelist"
                else:
                    options = {
                        **self.config_entry.options,
                        CONF_AUTHORIZED_NODES: nodes,
                    }
                    return self.async_create_entry(title="", data=options)

        devices, extra = _split_for_prefill(self.hass, list(current))
        schema = vol.Schema(
            {
                vol.Optional(FIELD_AUTH_DEVICES): _meshtastic_device(True),
                vol.Optional(FIELD_AUTH_EXTRA, default=""): str,
            }
        )
        return self.async_show_form(
            step_id="whitelist",
            data_schema=self.add_suggested_values_to_schema(
                schema,
                user_input
                or {FIELD_AUTH_DEVICES: devices, FIELD_AUTH_EXTRA: extra},
            ),
            errors=errors,
        )

    # --- Send timing -------------------------------------------------------

    async def async_step_timing(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit the send delays (initial and between parts)."""
        if user_input is not None:
            options = {
                **self.config_entry.options,
                CONF_INITIAL_DELAY: user_input[CONF_INITIAL_DELAY],
                CONF_PART_DELAY: user_input[CONF_PART_DELAY],
            }
            return self.async_create_entry(title="", data=options)

        opts = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_INITIAL_DELAY,
                    default=opts.get(CONF_INITIAL_DELAY, DEFAULT_INITIAL_DELAY),
                ): vol.All(vol.Coerce(float), vol.Range(min=0, max=60)),
                vol.Required(
                    CONF_PART_DELAY,
                    default=opts.get(CONF_PART_DELAY, DEFAULT_PART_DELAY),
                ): vol.All(vol.Coerce(float), vol.Range(min=0, max=30)),
            }
        )
        return self.async_show_form(step_id="timing", data_schema=schema)
