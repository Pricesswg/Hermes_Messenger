"""Putting the commands in the order the user wants.

The order is not decoration. `match_command` returns the first command whose
keyword matches, so when two keywords could both match the same message the
earlier one wins: a specific "lights kitchen" has to sit before a broader
"lights" that starts with the same word, or it can never fire. Until now the
order was whatever order they happened to be created in, with no way to change
it short of deleting and recreating them.

Groups are the other half and are presentation only. A label on each command,
free text, so twenty commands read as four short lists instead of one long one.
Grouping is applied by sorting the stored list, never by sorting at display
time: if the screen showed one order while matching used another, the rule
above would become impossible to reason about.

Pure: no Home Assistant, so the part that decides which command wins is
testable on its own.
"""

from __future__ import annotations

from typing import Any

from .const import CMD_GROUP, CMD_ID


def reorder(commands: list[dict[str, Any]], order: list[str]) -> list[dict[str, Any]]:
    """The commands rearranged to follow `order`, which lists command ids.

    Forgiving in both directions, because the card and the stored options can
    disagree for a moment: an id in `order` that no longer exists is skipped,
    and a command missing from `order` keeps its place at the end rather than
    disappearing. Losing a command to a stale request would be a far worse
    outcome than an unexpected position.
    """
    by_id = {str(command.get(CMD_ID)): command for command in commands}
    out: list[dict[str, Any]] = []
    used: set[str] = set()

    for command_id in order:
        command = by_id.get(str(command_id))
        if command is not None and str(command_id) not in used:
            out.append(command)
            used.add(str(command_id))

    for command in commands:
        if str(command.get(CMD_ID)) not in used:
            out.append(command)

    return out


def group_of(command: dict[str, Any]) -> str:
    """The group label of a command, empty for the ungrouped ones."""
    return str(command.get(CMD_GROUP) or "").strip()


def canonical_group(name: str | None) -> str:
    """The name to store for a group: trimmed and upper case.

    The field is free text, so "Lights" typed once and "lights" the next time
    would become two groups that look like a mistake and are one. Comparing
    without case would fix the symptom while leaving two spellings in storage
    and a question about which one to show. Storing one form removes the
    question: there is only ever one name for a group, and the headings were
    already drawn in capitals anyway.
    """
    return (name or "").strip().upper()


def group_names(commands: list[dict[str, Any]]) -> list[str]:
    """Group labels in the order they first appear, ungrouped last.

    First appearance rather than alphabetical, so the groups follow the order
    the user arranged rather than jumping around when one is renamed.
    """
    names: list[str] = []
    for command in commands:
        name = group_of(command)
        if name and name not in names:
            names.append(name)
    if any(not group_of(command) for command in commands):
        names.append("")
    return names


def sort_into_groups(commands: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Commands grouped together, each group keeping its internal order.

    Applied to the stored list so that what is displayed and what is matched
    are the same sequence. Ungrouped commands go last: they are the leftovers,
    and a broad catch-all keyword usually belongs at the end anyway.
    """
    order = group_names(commands)
    return sorted(commands, key=lambda command: order.index(group_of(command)))
