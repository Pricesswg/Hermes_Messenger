"""The card as an entry in the Home Assistant sidebar.

Opt in, and off by default. The sidebar is the user's own space and the list of
things in it is short on purpose; an integration that plants itself there
without being asked has decided something that was not its to decide.

Registering is idempotent and so is removing, because the setting can be
toggled from the card at any time and the panel has to end up matching it
without a restart.
"""

from __future__ import annotations

import logging

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant

from .const import CARD_URL, DATA_STORE, DOMAIN, SETTING_SIDEBAR

_LOGGER = logging.getLogger(__name__)

# The url path of the page, and the key the panel is remembered under.
PANEL_PATH = DOMAIN
PANEL_ELEMENT = "hermes-panel"


def async_apply_panel(hass: HomeAssistant, version: str = "0") -> None:
    """Add or remove the sidebar entry to match the setting.

    Failures are logged and swallowed: a sidebar entry is a convenience, and an
    integration that refuses to start because it could not add one would be
    trading something that matters for something that does not.
    """
    store = hass.data.get(DATA_STORE)
    wanted = bool(store.settings.get(SETTING_SIDEBAR)) if store else False
    present = PANEL_PATH in hass.data.get("frontend_panels", {})

    if wanted == present:
        return

    try:
        if wanted:
            frontend.async_register_built_in_panel(
                hass,
                "custom",
                sidebar_title="Hermes",
                sidebar_icon="mdi:radio-tower",
                frontend_url_path=PANEL_PATH,
                # The websocket commands decide for themselves what a non
                # administrator may read, so the page is as visible as the
                # Lovelace card is and no more permissive.
                require_admin=False,
                config={
                    "_panel_custom": {
                        "name": PANEL_ELEMENT,
                        "embed_iframe": False,
                        "trust_external": False,
                        # Same cache busting as the card: without the version a
                        # browser keeps the previous bundle after an update and
                        # the panel is the old one while the card is the new one.
                        "module_url": f"{CARD_URL}?v={version}",
                    }
                },
            )
            _LOGGER.info("Hermes: sidebar entry added")
        else:
            frontend.async_remove_panel(hass, PANEL_PATH)
            _LOGGER.info("Hermes: sidebar entry removed")
    except Exception:  # noqa: BLE001 - never break setup over a sidebar entry
        _LOGGER.warning("Hermes: could not update the sidebar entry", exc_info=True)
