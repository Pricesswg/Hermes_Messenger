"""Config flow e Options flow per Hermes.

Tutta la configurazione avviene da UI: niente YAML a mano, niente Jinja2 grezzo
esposto (i template di risposta usano placeholder semplici).
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
from homeassistant.core import callback
from homeassistant.helpers import selector

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
    MODE_CHANNEL,
    MODES,
    REPLY_CHANNEL,
    REPLY_TARGETS,
)


def _parse_nodes(raw: str) -> list[int]:
    """Converte una stringa 'id, id, ...' in lista di int, validando."""
    nodes: list[int] = []
    for token in (raw or "").replace(";", ",").split(","):
        token = token.strip()
        if not token:
            continue
        try:
            nodes.append(int(token))
        except ValueError as err:
            raise vol.Invalid(f"node id non valido: {token!r}") from err
    return nodes


def _format_nodes(nodes: list[int] | None) -> str:
    """Formatta una lista di node id come stringa per il prefill del form."""
    return ", ".join(str(n) for n in (nodes or []))


def _select(options: list[str], translation_key: str) -> selector.SelectSelector:
    """SelectSelector a tendina con opzioni tradotte via `translation_key`."""
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=options,
            mode=selector.SelectSelectorMode.DROPDOWN,
            translation_key=translation_key,
        )
    )


class HermesConfigFlow(ConfigFlow, domain=DOMAIN):
    """Config flow: crea una entry gateway + canale/DM."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step iniziale: dati del gateway, modalità, whitelist di partenza."""
        errors: dict[str, str] = {}

        if user_input is not None:
            try:
                authorized = _parse_nodes(user_input[CONF_AUTHORIZED_NODES])
            except vol.Invalid:
                errors[CONF_AUTHORIZED_NODES] = "invalid_node_list"
            else:
                if not authorized:
                    errors[CONF_AUTHORIZED_NODES] = "empty_whitelist"

            if not errors:
                gateway = user_input[CONF_GATEWAY_NODE_ID]
                mode = user_input[CONF_MODE]
                channel = (
                    user_input.get(CONF_CHANNEL_INDEX)
                    if mode == MODE_CHANNEL
                    else None
                )
                # unique_id per combinazione gateway+modalità+canale: consente
                # multi-istanza (canali diversi = entry diverse) senza duplicati.
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
                    f"Hermes · canale {channel} · gw {gateway}"
                    if mode == MODE_CHANNEL
                    else f"Hermes · DM · gw {gateway}"
                )
                return self.async_create_entry(title=title, data=data)

        schema = vol.Schema(
            {
                vol.Required(CONF_GATEWAY_NODE_ID): vol.Coerce(int),
                vol.Required(CONF_MODE, default=MODE_CHANNEL): _select(
                    MODES, "mode"
                ),
                vol.Optional(CONF_CHANNEL_INDEX, default=0): vol.All(
                    vol.Coerce(int), vol.Range(min=0, max=7)
                ),
                vol.Required(CONF_AUTHORIZED_NODES, default=""): str,
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
        """Restituisce l'options flow."""
        return HermesOptionsFlow()


class HermesOptionsFlow(OptionsFlow):
    """Options flow a menu: CRUD comandi, whitelist di default, timing."""

    _edit_id: str | None = None

    # --- Menu principale ---------------------------------------------------

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Menu principale."""
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

    # --- Comandi -----------------------------------------------------------

    def _commands(self) -> list[dict[str, Any]]:
        return list(self.config_entry.options.get(CONF_COMMANDS, []))

    def _command_schema(self, existing: dict[str, Any] | None = None) -> vol.Schema:
        """Schema del form comando (condiviso tra add ed edit)."""
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
                vol.Optional(CMD_AUTH_OVERRIDE, default=""): str,
            }
        )
        if existing is not None:
            prefill = dict(existing)
            prefill[CMD_AUTH_OVERRIDE] = _format_nodes(existing.get(CMD_AUTH_OVERRIDE))
            schema = self.add_suggested_values_to_schema(schema, prefill)
        return schema

    def _build_command(
        self, user_input: dict[str, Any], command_id: str
    ) -> dict[str, Any] | None:
        """Normalizza l'input del form in un oggetto comando. None se invalido."""
        override_raw = user_input.get(CMD_AUTH_OVERRIDE, "")
        override = _parse_nodes(override_raw)
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
        """Persiste la lista comandi preservando le altre options."""
        options = {**self.config_entry.options, CONF_COMMANDS: commands}
        return self.async_create_entry(title="", data=options)

    async def async_step_add_command(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Aggiunge un nuovo comando."""
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                command = self._build_command(user_input, uuid.uuid4().hex)
            except vol.Invalid:
                errors[CMD_AUTH_OVERRIDE] = "invalid_node_list"
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
        """Sceglie quale comando modificare."""
        commands = self._commands()
        if not commands:
            return await self.async_step_init()

        if user_input is not None:
            self._edit_id = user_input[CMD_ID]
            return await self.async_step_edit_command()

        options = [
            selector.SelectOptionDict(
                value=cmd[CMD_ID],
                label=f"{cmd.get(CMD_KEYWORD, '?')} → {cmd.get(CMD_SERVICE, '?')}",
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
        """Modifica il comando selezionato."""
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
                errors[CMD_AUTH_OVERRIDE] = "invalid_node_list"
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
        """Rimuove uno o più comandi."""
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
                label=f"{cmd.get(CMD_KEYWORD, '?')} → {cmd.get(CMD_SERVICE, '?')}",
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

    # --- Whitelist di default ----------------------------------------------

    async def async_step_whitelist(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Modifica la whitelist di default (node id autorizzati)."""
        errors: dict[str, str] = {}
        current = self.config_entry.options.get(
            CONF_AUTHORIZED_NODES,
            self.config_entry.data.get(CONF_AUTHORIZED_NODES, []),
        )

        if user_input is not None:
            try:
                nodes = _parse_nodes(user_input[CONF_AUTHORIZED_NODES])
            except vol.Invalid:
                errors[CONF_AUTHORIZED_NODES] = "invalid_node_list"
            else:
                if not nodes:
                    errors[CONF_AUTHORIZED_NODES] = "empty_whitelist"
                else:
                    options = {
                        **self.config_entry.options,
                        CONF_AUTHORIZED_NODES: nodes,
                    }
                    return self.async_create_entry(title="", data=options)

        schema = vol.Schema(
            {
                vol.Required(
                    CONF_AUTHORIZED_NODES, default=_format_nodes(current)
                ): str
            }
        )
        return self.async_show_form(
            step_id="whitelist", data_schema=schema, errors=errors
        )

    # --- Timing invii ------------------------------------------------------

    async def async_step_timing(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Modifica i delay di invio (iniziale e tra le parti)."""
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
