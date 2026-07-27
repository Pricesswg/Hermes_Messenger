"""Every module must import, and the integration must actually set up.

    .venv/bin/pytest tests/test_imports.py -v

This file exists because of a real failure. A constant was used in the config
flow without being imported, and nothing caught it: `python -m py_compile`
compiles a module without executing it, so a name that does not exist at module
level is perfectly valid bytecode. Home Assistant found it at startup, with
"Unexpected exception importing platform custom_components.hermes.config_flow"
and an integration that would not configure.

The lesson is narrow and worth keeping: compiling is not importing, and
importing is not setting up. Each of the three catches things the one before it
cannot.
"""

from __future__ import annotations

import importlib
import pkgutil
from pathlib import Path

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.hermes.const import (
    CONF_AUTHORIZED_NODES,
    CONF_GATEWAY_NODE_ID,
    CONF_MODE,
    DOMAIN,
    MODE_DIRECT,
)

PACKAGE = "custom_components.hermes"
PACKAGE_PATH = Path(__file__).resolve().parent.parent / "custom_components" / "hermes"


def module_names() -> list[str]:
    """Every module in the integration, discovered rather than listed.

    A hand written list would not have covered a module added later, which is
    exactly when this check matters.
    """
    return sorted(
        info.name for info in pkgutil.iter_modules([str(PACKAGE_PATH)])
    )


def test_the_package_has_the_modules_we_think_it_has():
    """Guards the discovery itself: an empty list would pass every test below."""
    found = module_names()
    assert len(found) >= 10, found
    for expected in ("config_flow", "coordinator", "websocket", "const"):
        assert expected in found


@pytest.mark.parametrize("name", module_names())
def test_module_imports(name: str):
    """Import, which runs the module body: decorators, classes, constants."""
    importlib.import_module(f"{PACKAGE}.{name}")


def test_the_config_flow_declares_a_version():
    """The class body is where the failure was, so read a value out of it."""
    from custom_components.hermes.config_flow import HermesConfigFlow
    from custom_components.hermes.const import CONFIG_ENTRY_VERSION

    assert HermesConfigFlow.VERSION == CONFIG_ENTRY_VERSION


async def test_the_integration_sets_up_and_unloads(hass):
    """The whole path Home Assistant takes at startup, not just the imports."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Gateway",
        data={
            CONF_GATEWAY_NODE_ID: 1128074276,
            CONF_MODE: MODE_DIRECT,
            CONF_AUTHORIZED_NODES: [],
        },
    )
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.entry_id in hass.data[DOMAIN]
    # The services automations rely on have to be there after a setup.
    assert hass.services.has_service(DOMAIN, "broadcast")
    assert hass.services.has_service(DOMAIN, "send_direct")

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.entry_id not in hass.data[DOMAIN]


async def test_the_card_is_served_even_with_no_entry_at_all(hass):
    """The user interface must not depend on a gateway working.

    This is the failure the user hit: an entry that would not load took the
    card down with it, so the dashboard said "Configuration error" and the one
    screen that could have explained why was the screen that did not load.
    """
    from homeassistant.components.frontend import DATA_EXTRA_MODULE_URL
    from homeassistant.setup import async_setup_component

    from custom_components.hermes.const import CARD_URL, DATA_CARD_REGISTERED

    assert await async_setup_component(hass, DOMAIN, {})
    await hass.async_block_till_done()

    assert hass.data.get(DATA_CARD_REGISTERED) is True
    urls = hass.data[DATA_EXTRA_MODULE_URL].urls
    assert any(url.startswith(CARD_URL) for url in urls), urls
    # And the websocket API the card talks to, for the same reason.
    assert "hermes/entries/list" in hass.data["websocket_api"]
