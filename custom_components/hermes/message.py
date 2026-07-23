"""Split/troncamento byte-safe dei messaggi Meshtastic.

Modulo PURO: nessuna dipendenza da Home Assistant, testabile in isolamento.

Meshtastic impone un limite in *byte* (non caratteri) sul payload testuale.
Questo modulo spezza un testo arbitrario in una lista di stringhe pronte per
`meshtastic.send_text`, garantendo che:

  - ogni parte, codificata in UTF-8, non superi il limite in byte;
  - nessun carattere multi-byte venga mai tagliato a metà (lavoriamo per
    carattere, non per byte grezzo);
  - se serve più di una parte, ogni parte porti un header ``(i/n) `` il cui
    costo in byte è già scontato dal budget disponibile.
"""

from __future__ import annotations

# Limite di default del payload Meshtastic. È il valore documentato: va
# comunque riconfermato empiricamente sul firmware in uso.
DEFAULT_BYTE_LIMIT = 200

# Safety valve: cap sulle iterazioni del punto fisso. In pratica converge in
# 2-3 giri; superarlo significa un bug logico, non un input "difficile" —
# meglio esplodere che entrare in loop infinito.
_MAX_ITERATIONS = 12


def _byte_len(text: str) -> int:
    """Lunghezza in byte UTF-8 di una stringa."""
    return len(text.encode("utf-8"))


def _header_len(n: int) -> int:
    """Byte occupati dall'header nel *caso peggiore* per un totale di ``n`` parti.

    L'header reale della parte ``i`` è ``(i/n) ``. Poiché ``i <= n``, il numero
    di cifre di ``i`` non supera mai quello di ``n``: calcolando il budget sul
    caso ``(n/n) `` otteniamo un tetto valido per *tutte* le parti con un solo
    numero. È questo che rende impossibile lo sforamento quando le parti
    passano da 9 a 10 (header da 1 a 2 cifre).
    """
    return _byte_len(f"({n}/{n}) ")


def _pack(text: str, content_budget: int) -> list[str]:
    """Impacchetta ``text`` in parti il cui contenuto sta in ``content_budget`` byte.

    Greedy per carattere: accumula finché aggiungere il prossimo carattere
    supererebbe il budget, poi apre una nuova parte. Non inserisce header.

    Solleva ``ValueError`` se un singolo carattere non entra nel budget (limite
    assurdamente piccolo): senza questa guardia il loop non avanzerebbe mai.
    """
    parts: list[str] = []
    current: list[str] = []
    current_bytes = 0

    for ch in text:
        cb = _byte_len(ch)
        if cb > content_budget:
            raise ValueError(
                f"carattere da {cb} byte non entra nel budget di "
                f"{content_budget} byte: limite troppo piccolo"
            )
        if current_bytes + cb > content_budget:
            parts.append("".join(current))
            current = [ch]
            current_bytes = cb
        else:
            current.append(ch)
            current_bytes += cb

    if current:
        parts.append("".join(current))
    return parts


def split_message(text: str, limit: int = DEFAULT_BYTE_LIMIT) -> list[str]:
    """Spezza ``text`` in parti inviabili via Meshtastic.

    Args:
        text: testo da inviare (già decodificato, ``str``).
        limit: tetto in byte per ogni parte (header incluso). Default 200.

    Returns:
        Lista di stringhe. Casi:
          - ``text`` vuoto -> ``[]`` (scelta esplicita: niente da inviare);
          - ``text`` che sta in ``limit`` byte -> ``[text]`` senza header;
          - altrimenti N parti, ognuna con header ``(i/n) `` e <= ``limit`` byte.

    Raises:
        ValueError: ``limit`` troppo piccolo per contenere header + un carattere.
        RuntimeError: mancata convergenza del punto fisso (bug logico).
    """
    if text == "":
        return []

    # Caso comune: entra tutto in un solo messaggio, nessun header.
    if _byte_len(text) <= limit:
        return [text]

    # Punto fisso sul numero di parti. f(n) = numero di parti prodotte con il
    # budget derivato da n; f è monotona non-decrescente in n (più parti =>
    # header più lungo => budget minore => non meno parti), quindi iterando
    # dal basso converge al più piccolo n con f(n) == n.
    n = 1
    for _ in range(_MAX_ITERATIONS):
        content_budget = limit - _header_len(n)
        if content_budget <= 0:
            raise ValueError(
                f"limite {limit} byte insufficiente per l'header di {n} parti"
            )
        parts = _pack(text, content_budget)
        m = len(parts)
        if m == n:
            break
        n = m
    else:
        raise RuntimeError(
            "split_message: punto fisso non convergente (bug logico)"
        )

    return [f"({i}/{n}) {part}" for i, part in enumerate(parts, start=1)]
