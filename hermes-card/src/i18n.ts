// Card translations. English is the base; the other four follow the project's
// five-language set (EN, IT, ES, FR, DE).

import type { HomeAssistant } from "./types";

type Dict = Record<string, string>;

const en: Dict = {
  "tab.status": "Status",
  "tab.devices": "Devices",
  "tab.map": "Map",
  "tab.messages": "Messages",
  "tab.homeassistant": "Home Assistant",
  "tab.settings": "Settings",

  "status.title": "Status",
  "status.nodes": "Nodes",
  "status.commands": "Configured commands",
  "status.executed": "Executed today",
  "status.lastCommand": "Last command",
  "status.lastError": "Last error",
  "status.none": "None",
  "status.noIntegration": "No Hermes entities found. Add the integration first.",

  "devices.title": "Devices",
  "devices.empty": "No Meshtastic devices found. Set up the Meshtastic integration first.",
  "devices.unknown": "Unknown",

  "common.comingSoon": "Coming in the next build phase.",
  "common.phase": "Phase",
};

const it: Dict = {
  "tab.status": "Status",
  "tab.devices": "Dispositivi",
  "tab.map": "Mappa",
  "tab.messages": "Messaggi",
  "tab.homeassistant": "Home Assistant",
  "tab.settings": "Impostazioni",

  "status.title": "Status",
  "status.nodes": "Nodi",
  "status.commands": "Comandi configurati",
  "status.executed": "Eseguiti oggi",
  "status.lastCommand": "Ultimo comando",
  "status.lastError": "Ultimo errore",
  "status.none": "Nessuno",
  "status.noIntegration": "Nessuna entità Hermes trovata. Aggiungi prima l'integrazione.",

  "devices.title": "Dispositivi",
  "devices.empty": "Nessun dispositivo Meshtastic trovato. Configura prima l'integrazione Meshtastic.",
  "devices.unknown": "Sconosciuto",

  "common.comingSoon": "In arrivo nella prossima fase di sviluppo.",
  "common.phase": "Fase",
};

const es: Dict = {
  "tab.status": "Estado",
  "tab.devices": "Dispositivos",
  "tab.map": "Mapa",
  "tab.messages": "Mensajes",
  "tab.homeassistant": "Home Assistant",
  "tab.settings": "Ajustes",

  "status.title": "Estado",
  "status.nodes": "Nodos",
  "status.commands": "Comandos configurados",
  "status.executed": "Ejecutados hoy",
  "status.lastCommand": "Último comando",
  "status.lastError": "Último error",
  "status.none": "Ninguno",
  "status.noIntegration": "No se han encontrado entidades de Hermes. Añade primero la integración.",

  "devices.title": "Dispositivos",
  "devices.empty": "No se han encontrado dispositivos Meshtastic. Configura primero la integración Meshtastic.",
  "devices.unknown": "Desconocido",

  "common.comingSoon": "Llegará en la próxima fase de desarrollo.",
  "common.phase": "Fase",
};

const fr: Dict = {
  "tab.status": "État",
  "tab.devices": "Appareils",
  "tab.map": "Carte",
  "tab.messages": "Messages",
  "tab.homeassistant": "Home Assistant",
  "tab.settings": "Paramètres",

  "status.title": "État",
  "status.nodes": "Nœuds",
  "status.commands": "Commandes configurées",
  "status.executed": "Exécutées aujourd'hui",
  "status.lastCommand": "Dernière commande",
  "status.lastError": "Dernière erreur",
  "status.none": "Aucun",
  "status.noIntegration": "Aucune entité Hermes trouvée. Ajoutez d'abord l'intégration.",

  "devices.title": "Appareils",
  "devices.empty": "Aucun appareil Meshtastic trouvé. Configurez d'abord l'intégration Meshtastic.",
  "devices.unknown": "Inconnu",

  "common.comingSoon": "Arrive dans la prochaine phase de développement.",
  "common.phase": "Phase",
};

const de: Dict = {
  "tab.status": "Status",
  "tab.devices": "Geräte",
  "tab.map": "Karte",
  "tab.messages": "Nachrichten",
  "tab.homeassistant": "Home Assistant",
  "tab.settings": "Einstellungen",

  "status.title": "Status",
  "status.nodes": "Nodes",
  "status.commands": "Konfigurierte Befehle",
  "status.executed": "Heute ausgeführt",
  "status.lastCommand": "Letzter Befehl",
  "status.lastError": "Letzter Fehler",
  "status.none": "Keine",
  "status.noIntegration": "Keine Hermes-Entitäten gefunden. Füge zuerst die Integration hinzu.",

  "devices.title": "Geräte",
  "devices.empty": "Keine Meshtastic-Geräte gefunden. Richte zuerst die Meshtastic-Integration ein.",
  "devices.unknown": "Unbekannt",

  "common.comingSoon": "Kommt in der nächsten Ausbaustufe.",
  "common.phase": "Phase",
};

const DICTS: Record<string, Dict> = { en, it, es, fr, de };

export function translator(hass?: HomeAssistant) {
  const raw = hass?.locale?.language || hass?.language || "en";
  const lang = raw.split("-")[0].toLowerCase();
  const dict = DICTS[lang] || en;
  return (key: string): string => dict[key] ?? en[key] ?? key;
}
