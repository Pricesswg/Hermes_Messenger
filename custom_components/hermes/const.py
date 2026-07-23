"""Costanti per l'integrazione Hermes (Meshtastic Commander)."""

from __future__ import annotations

DOMAIN = "hermes"
PLATFORMS = ["sensor"]

# --- Integrazione base Meshtastic (verificata su meshtastic/home-assistant) --
# L'evento e il servizio appartengono all'integrazione ufficiale `meshtastic`.
# Riconfermare su ogni major update della base: qui c'è tutto il coupling.
MESHTASTIC_DOMAIN = "meshtastic"
EVENT_TEXT_MESSAGE = "meshtastic_api_text_message"
SERVICE_SEND_TEXT = "send_text"

# --- Chiavi Config Entry (step "user") -------------------------------------
CONF_GATEWAY_NODE_ID = "gateway_node_id"
CONF_MODE = "mode"
CONF_CHANNEL_INDEX = "channel_index"
CONF_AUTHORIZED_NODES = "authorized_nodes"

MODE_CHANNEL = "channel"
MODE_DIRECT = "direct_message"
MODES = [MODE_CHANNEL, MODE_DIRECT]

# --- Chiavi Options --------------------------------------------------------
CONF_COMMANDS = "commands"
CONF_INITIAL_DELAY = "initial_delay"
CONF_PART_DELAY = "part_delay"

# Chiavi del singolo comando (oggetto in CONF_COMMANDS).
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

# --- Default ---------------------------------------------------------------
# 200 byte è il limite documentato Meshtastic; da riconfermare sul firmware.
DEFAULT_BYTE_LIMIT = 200
# Il radio può scartare risposte immediate: attesa iniziale prima del 1o invio.
DEFAULT_INITIAL_DELAY = 5
# Pausa tra le parti successive per non congestionare la mesh.
DEFAULT_PART_DELAY = 2
