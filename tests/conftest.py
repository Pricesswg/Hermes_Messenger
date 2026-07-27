"""Shared fixtures for the tests that need a real Home Assistant.

The pure modules (matching, message, tokens, rate_limit, nodedb) are tested by
importing the file directly and need none of this. The coordinator does: it
calls services, reads states and writes to the store, and those are exactly the
parts worth testing against the real thing rather than a stand in.
"""

from __future__ import annotations

import sys
from pathlib import Path

import pytest

# So `custom_components.hermes` imports without installing the package.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

pytest_plugins = "pytest_homeassistant_custom_component"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Let Home Assistant load custom_components in every test."""
    return
