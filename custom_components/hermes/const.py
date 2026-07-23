"""Constants for the Hermes integration (Meshtastic Commander)."""

from __future__ import annotations

DOMAIN = "hermes"
PLATFORMS = ["sensor"]

# --- Base Meshtastic integration (verified against meshtastic/home-assistant) -
# The event and the service belong to the official `meshtastic` integration.
# Reconfirm on every major update of the base: all the coupling lives here.
MESHTASTIC_DOMAIN = "meshtastic"
EVENT_TEXT_MESSAGE = "meshtastic_api_text_message"
SERVICE_SEND_TEXT = "send_text"

# --- Config Entry keys (step "user") ---------------------------------------
CONF_GATEWAY_NODE_ID = "gateway_node_id"
CONF_MODE = "mode"
CONF_CHANNEL_INDEX = "channel_index"
CONF_AUTHORIZED_NODES = "authorized_nodes"

MODE_CHANNEL = "channel"
MODE_DIRECT = "direct_message"
MODES = [MODE_CHANNEL, MODE_DIRECT]

# --- Options keys ----------------------------------------------------------
CONF_COMMANDS = "commands"
CONF_INITIAL_DELAY = "initial_delay"
CONF_PART_DELAY = "part_delay"

# Keys of a single command (object in CONF_COMMANDS).
CMD_ID = "id"
CMD_KEYWORD = "keyword"
CMD_MATCH_TYPE = "match_type"
CMD_SERVICE = "service"
CMD_TARGET = "target"
CMD_SERVICE_DATA = "service_data"
CMD_REPLY_TEMPLATE = "reply_template"
CMD_REPLY_TO = "reply_to"
CMD_AUTH_OVERRIDE = "authorized_nodes_override"

MATCH_EXACT = "exact"
MATCH_STARTSWITH = "startswith"
MATCH_TYPES = [MATCH_EXACT, MATCH_STARTSWITH]

REPLY_CHANNEL = "channel"
REPLY_SENDER_DM = "sender_dm"
REPLY_TARGETS = [REPLY_CHANNEL, REPLY_SENDER_DM]

# --- Lovelace card ---------------------------------------------------------
# The bundle is built from `hermes-card/` (rollup) into this integration's
# `www/` folder and registered with the frontend at setup time, so the user
# never has to add a Lovelace resource by hand.
CARD_FILENAME = "hermes-card.js"
CARD_URL = f"/{DOMAIN}_static/{CARD_FILENAME}"
DATA_CARD_REGISTERED = f"{DOMAIN}_card_registered"

# --- Defaults --------------------------------------------------------------
# 200 bytes is the documented Meshtastic limit; reconfirm against the firmware.
DEFAULT_BYTE_LIMIT = 200
# The radio may drop immediate replies: initial wait before the first send.
DEFAULT_INITIAL_DELAY = 5
# Pause between subsequent parts to avoid congesting the mesh.
DEFAULT_PART_DELAY = 2
