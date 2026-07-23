"""Test dei 5 criteri di accettazione per il motore di split byte-safe.

Puro Python, nessuna istanza Home Assistant richiesta:

    .venv/bin/pytest tests/test_message.py -v
"""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

import pytest

# Import diretto del modulo per path: evita di dover installare il package
# `custom_components.hermes` (che a sua volta importerebbe Home Assistant).
_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "message.py"
)
_spec = importlib.util.spec_from_file_location("hermes_message", _MODULE_PATH)
message = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(message)

split_message = message.split_message
LIMIT = message.DEFAULT_BYTE_LIMIT

_HEADER_RE = re.compile(r"^\((\d+)/(\d+)\) ")


def _byte_len(s: str) -> int:
    return len(s.encode("utf-8"))


# --- Criterio 1: ASCII corto -> 1 solo messaggio, nessun header ------------

def test_ascii_corto_singolo_senza_header():
    text = "Salotto: 21.5C, luci spente"
    out = split_message(text, LIMIT)
    assert out == [text]
    assert _HEADER_RE.match(out[0]) is None


# --- Criterio 2: ASCII lungo -> N parti, ognuna <= limite, header corretti --

def test_ascii_lungo_multiparte():
    text = "A" * 500
    out = split_message(text, LIMIT)

    assert len(out) > 1
    for part in out:
        assert _byte_len(part) <= LIMIT

    # Header sequenziali e coerenti: (1/n), (2/n), ... (n/n).
    n = len(out)
    for idx, part in enumerate(out, start=1):
        m = _HEADER_RE.match(part)
        assert m is not None, f"parte senza header: {part!r}"
        assert int(m.group(1)) == idx
        assert int(m.group(2)) == n

    # Nessun carattere perso: ricomponendo i contenuti si torna all'originale.
    rebuilt = "".join(_HEADER_RE.sub("", part) for part in out)
    assert rebuilt == text


# --- Criterio 3: accenti/emoji al limite -> nessun char tagliato -----------

@pytest.mark.parametrize(
    "text",
    [
        "à" * 130,          # 2 byte/char, ~260 byte -> forza lo split
        "€" * 90,           # 3 byte/char
        "🚨" * 70,          # 4 byte/char (emoji)
        "Allarme perimetro nord 🚨 rilevato movimento alle 03:14 — verificare 📹" * 6,
    ],
)
def test_multibyte_nessun_char_troncato(text):
    out = split_message(text, LIMIT)

    rebuilt_parts = []
    for part in out:
        # Ogni parte deve essere valida UTF-8 (lo è per costruzione, ma
        # ri-decodifichiamo per certezza: nessun surrogato/troncamento).
        assert _byte_len(part) <= LIMIT
        part.encode("utf-8").decode("utf-8")  # non deve sollevare
        rebuilt_parts.append(_HEADER_RE.sub("", part))

    assert "".join(rebuilt_parts) == text


# --- Criterio 4: >=10 parti -> header a 2 cifre non sfora il budget ---------

def test_dieci_o_piu_parti_header_due_cifre():
    # Limite piccolo per forzare parecchie parti con testo gestibile.
    limit = 24
    text = "X" * 400
    out = split_message(text, limit)

    assert len(out) >= 10, "il caso di test deve produrre >= 10 parti"
    n = len(out)
    assert n >= 10  # header a 2 cifre presente

    for part in out:
        assert _byte_len(part) <= limit, (
            f"parte oltre il limite ({_byte_len(part)} > {limit}): {part!r}"
        )

    # Le parti con indice >= 10 hanno effettivamente header a 2 cifre.
    assert any(_HEADER_RE.match(p).group(1) == "10" for p in out)
    rebuilt = "".join(_HEADER_RE.sub("", part) for part in out)
    assert rebuilt == text


# --- Criterio 5: stringa vuota -> comportamento esplicito ([]) --------------

def test_stringa_vuota_lista_vuota():
    assert split_message("", LIMIT) == []


# --- Guardie extra (safety valve) ------------------------------------------

def test_limite_al_confine_esatto():
    # Esattamente `limit` byte -> singolo messaggio senza header.
    text = "A" * LIMIT
    out = split_message(text, LIMIT)
    assert out == [text]

    # Un byte in più -> due parti.
    out2 = split_message("A" * (LIMIT + 1), LIMIT)
    assert len(out2) == 2


def test_limite_assurdo_solleva_valueerror():
    # Header di 2 parti ~ 6 byte; con limite 6 non entra alcun carattere.
    with pytest.raises(ValueError):
        split_message("ciao mondo lungo abbastanza da spezzarsi", 6)
