#!/usr/bin/env python3
"""Fail when a language is missing a key, or carries one nobody else has.

Two sets of translations, checked the same way against the English base:

  custom_components/hermes/strings.json  ->  translations/<lang>.json
  hermes-card/src/i18n.ts                ->  the four blocks after the English one

A missing key does not crash anything, which is the problem: Home Assistant
falls back to English and the card prints the raw key, so a half translated
release looks fine to whoever wrote it in English and broken to everyone else.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LANGUAGES = ["it", "es", "fr", "de"]


def flatten(data: dict, prefix: str = "") -> set[str]:
    """Every leaf path of a nested dictionary."""
    keys: set[str] = set()
    for key, value in data.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            keys |= flatten(value, path)
        else:
            keys.add(path)
    return keys


def check_backend() -> list[str]:
    """strings.json against every file in translations/."""
    base = ROOT / "custom_components" / "hermes"
    reference = flatten(json.loads((base / "strings.json").read_text("utf-8")))
    problems = []

    for language in LANGUAGES + ["en"]:
        path = base / "translations" / f"{language}.json"
        if not path.is_file():
            problems.append(f"backend: translations/{language}.json is missing")
            continue
        keys = flatten(json.loads(path.read_text("utf-8")))
        for key in sorted(reference - keys):
            problems.append(f"backend {language}: missing {key}")
        for key in sorted(keys - reference):
            problems.append(f"backend {language}: {key} is not in strings.json")

    return problems


def card_blocks() -> dict[str, set[str]]:
    """The translation keys of each language block in i18n.ts.

    Parsed rather than executed: this runs in CI without a Node install, and
    the file is a flat list of "key": "value" lines by construction.
    """
    source = (ROOT / "hermes-card" / "src" / "i18n.ts").read_text("utf-8")
    blocks: dict[str, set[str]] = {}
    current: str | None = None

    for line in source.splitlines():
        started = re.match(r"^const (\w+)\s*[:=]", line)
        if started:
            current = started.group(1)
            blocks.setdefault(current, set())
            continue
        entry = re.match(r'^\s+"([\w.]+)":', line)
        if entry and current:
            blocks[current].add(entry.group(1))

    return blocks


def check_card() -> list[str]:
    """The English block against the other four."""
    blocks = card_blocks()
    problems = []

    if "en" not in blocks:
        return ["card: no English block found in i18n.ts"]

    reference = blocks["en"]
    for language in LANGUAGES:
        keys = blocks.get(language)
        if not keys:
            problems.append(f"card: no {language} block found in i18n.ts")
            continue
        for key in sorted(reference - keys):
            problems.append(f"card {language}: missing {key}")
        for key in sorted(keys - reference):
            problems.append(f"card {language}: {key} is not in the English block")

    return problems


def main() -> int:
    problems = check_backend() + check_card()
    if problems:
        for problem in problems:
            print(problem, file=sys.stderr)
        print(f"\n{len(problems)} translation problems", file=sys.stderr)
        return 1

    print("Translations complete in every language")
    return 0


if __name__ == "__main__":
    sys.exit(main())
