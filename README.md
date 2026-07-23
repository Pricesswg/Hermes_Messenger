# Hermes — Meshtastic Commander

Integrazione custom per Home Assistant che permette agli iscritti di un canale
(o DM) Meshtastic cifrato di **inviare comandi testuali che eseguono azioni Home
Assistant e ricevono una risposta**, e a Home Assistant di **inviare notifiche
broadcast** sulla mesh da qualunque automazione (anche schedulata).

Hermes è un **livello applicativo** sopra l'integrazione ufficiale
[`meshtastic/home-assistant`](https://github.com/meshtastic/home-assistant): non
gestisce la connessione al nodo (TCP/seriale/BLE), ma ascolta i suoi eventi e usa
i suoi servizi. Tutta la configurazione avviene da UI — niente YAML a mano, niente
Jinja2 grezzo, niente Lovelace card custom.

## Prerequisiti

- Home Assistant recente (config flow, options flow moderno, `TargetSelector`).
- **Integrazione Meshtastic ufficiale già installata e configurata** (`domain: meshtastic`),
  con almeno un gateway connesso. Hermes dipende dal suo evento
  `meshtastic_api_text_message` e dal servizio `meshtastic.send_text`.
- Firmware Meshtastic con PKC (≥ 2.5) se vuoi usare i DM come canale affidabile
  (vedi *Sicurezza*).

## Installazione (HACS, repository custom privata)

Finché la repo è privata:

1. HACS → menu ⋮ → **Custom repositories**.
2. Aggiungi l'URL della repo (categoria **Integration**). Per una repo privata
   serve che HACS abbia accesso: configura un **Personal Access Token** GitHub con
   scope `repo` nelle impostazioni HACS, oppure rendi la repo pubblica.
3. Installa "Hermes", riavvia Home Assistant.
4. **Impostazioni → Dispositivi e servizi → Aggiungi integrazione → Hermes**.

Quando la repo diventerà pubblica, non serve altro packaging: `hacs.json` è già
pronto.

## Configurazione

### Step iniziale (config flow)

| Campo | Descrizione |
|-------|-------------|
| **Node ID del gateway** | Node id del gateway Meshtastic da cui/verso cui operare. |
| **Modalità** | `Canale (broadcast)` oppure `Messaggio diretto (DM)`. |
| **Indice canale** | 0-7, usato solo in modalità canale. |
| **Node ID autorizzati** | Whitelist di default, separati da virgola (almeno uno). |

Per gestire **più canali**: aggiungi l'integrazione più volte (una config entry per
combinazione gateway + canale/DM). È multi-istanza nativo, nessuna configurazione ad hoc.

### Comandi (options flow)

**Configura → Aggiungi un comando.** Ogni comando:

| Campo | Note |
|-------|------|
| **Parola chiave** | Es. `stato`, `luci off`. |
| **Tipo di match** | `Match esatto` o `Inizia con`. |
| **Servizio** | `dominio.servizio`, es. `light.turn_off`. |
| **Target** | Entità o area (selettore nativo). |
| **Template di risposta** | Placeholder semplici (sotto). |
| **Instradamento risposta** | Su canale (broadcast) o in DM al mittente. |
| **Dati servizio** | Opzionale, avanzato (dict). |
| **Override nodi autorizzati** | Opzionale: whitelist specifica per questo comando. |

I comandi sono **modificabili senza riavviare** l'integrazione.

#### Placeholder del template di risposta

Niente Jinja2: solo due placeholder, risolti internamente.

- `{state:entity_id}` → stato dell'entità. Es. `{state:sensor.temperatura_salotto}`
- `{attr:entity_id:attributo}` → valore di un attributo. Es. `{attr:climate.salotto:temperature}`

Esempio di risposta: `Salotto: {state:sensor.temp_salotto}°C, luci {state:light.salotto}`

## Servizi (per automazioni, anche schedulate)

La "funzione di scheduling" si ottiene componendo automazioni HA standard con questi
servizi — nessuno scheduler interno.

- **`hermes.broadcast`** — `config_entry_id`, `message`. Invia sul canale/DM della entry.
- **`hermes.send_direct`** — `config_entry_id`, `node_id`, `message`. DM a un singolo nodo.

Entrambi passano dallo split byte-safe (≤ 200 byte per parte, header `(i/n) `,
nessun carattere multi-byte tagliato).

```yaml
# Esempio: notifica schedulata ogni sera alle 22:00
automation:
  - alias: "Meshtastic: promemoria serale"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: hermes.broadcast
        data:
          config_entry_id: <ID_ENTRY_HERMES>
          message: "Buonanotte — chiusura cancelli tra 10 minuti."
```

## Entità diagnostiche

Sotto il device della config entry (device page nativa):

- **Ultimo comando ricevuto** — testo, nodo mittente e timestamp (attributi).
- **Comandi eseguiti** — contatore con reset giornaliero.
- **Ultimo errore / rifiuto autorizzazione** — utile in debug senza leggere i log.

## Sicurezza — canale vs DM+PKC

> **Leggere prima di esporre azioni sensibili.**

- **Su canale broadcast** la protezione è solo la **PSK del canale**: chiunque la
  conosca può inviare comandi con un `from` **dichiarato ma non provato
  crittograficamente**. La whitelist di nodi qui è una protezione **debole**
  (spoofing del mittente possibile).
- **Su DM con PKC** (Public Key Cryptography, firmware ≥ 2.5) l'identità del mittente
  è garantita **a livello di protocollo** prima ancora che il messaggio arrivi a Home
  Assistant. La whitelist qui è **affidabile**.

La whitelist va comunque configurata in entrambi i casi. Per comandi che controllano
entità critiche, preferire la modalità **DM con PKC**. Verificare il comportamento sul
**firmware effettivamente in uso**: non darlo per assodato.

## Da tarare/verificare sull'hardware reale

Questi valori sono default ragionevoli, non verità sperimentali:

- **Timing invii** (`Configura → Timing di invio`): attesa iniziale 5s prima della
  prima risposta (il radio può scartare risposte immediate) e 2s tra le parti. Tara
  sui tuoi tempi reali.
- **Limite byte** (200) è il valore documentato; conferma col tuo firmware.
- **Schema evento e firma `send_text`** sono verificati su `meshtastic/home-assistant`
  (branch main): riconferma dopo major update dell'integrazione base.

## Sviluppo / test

Il motore di split è puro Python e testabile senza Home Assistant:

```bash
python3 -m venv .venv
.venv/bin/pip install pytest
.venv/bin/pytest tests/test_message.py -v
```

> Nota packaging: aggiornare `manifest.json` (`documentation`, `issue_tracker`,
> `codeowners`) con l'handle/URL GitHub reali prima della pubblicazione.
