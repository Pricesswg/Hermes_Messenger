"""Tests for the order the commands are tried in.

    .venv/bin/pytest tests/test_ordering.py -v

Order decides which command wins when two keywords could both match, so this is
about matching, not only about presentation.
"""

from __future__ import annotations

# Imported as part of the package rather than loaded by path: this module reads
# the command keys from const, so it needs its package context.
from custom_components.hermes.ordering import (
    canonical_group,
    group_names,
    reorder,
    sort_into_groups,
)


def cmd(cid: str, group: str = "") -> dict:
    return {"id": cid, "keyword": cid, "group": group}


# --- Reordering ------------------------------------------------------------


def test_the_commands_follow_the_given_order():
    commands = [cmd("a"), cmd("b"), cmd("c")]
    out = reorder(commands, ["c", "a", "b"])
    assert [c["id"] for c in out] == ["c", "a", "b"]


def test_nothing_is_lost_when_the_order_is_incomplete():
    """A stale request must not delete a command."""
    commands = [cmd("a"), cmd("b"), cmd("c")]
    out = reorder(commands, ["b"])
    assert sorted(c["id"] for c in out) == ["a", "b", "c"]
    assert out[0]["id"] == "b"


def test_an_unknown_id_is_skipped():
    commands = [cmd("a"), cmd("b")]
    out = reorder(commands, ["ghost", "b", "a"])
    assert [c["id"] for c in out] == ["b", "a"]


def test_a_repeated_id_is_not_duplicated():
    commands = [cmd("a"), cmd("b")]
    out = reorder(commands, ["a", "a", "b"])
    assert [c["id"] for c in out] == ["a", "b"]


def test_an_empty_order_changes_nothing():
    commands = [cmd("a"), cmd("b")]
    assert [c["id"] for c in reorder(commands, [])] == ["a", "b"]


# --- Groups ----------------------------------------------------------------


def test_groups_are_listed_in_order_of_first_appearance():
    commands = [cmd("a", "Lights"), cmd("b", "Heating"), cmd("c", "Lights")]
    assert group_names(commands) == ["Lights", "Heating"]


def test_the_ungrouped_come_last():
    commands = [cmd("a"), cmd("b", "Lights")]
    assert group_names(commands) == ["Lights", ""]


def test_sorting_gathers_each_group_without_shuffling_inside_it():
    commands = [
        cmd("a", "Lights"),
        cmd("b", "Heating"),
        cmd("c", "Lights"),
        cmd("d"),
        cmd("e", "Heating"),
    ]
    assert [c["id"] for c in sort_into_groups(commands)] == ["a", "c", "b", "e", "d"]


def test_sorting_is_stable_when_nothing_is_grouped():
    """No groups means no reordering, so an arranged list is left alone."""
    commands = [cmd("a"), cmd("b"), cmd("c")]
    assert [c["id"] for c in sort_into_groups(commands)] == ["a", "b", "c"]


def test_grouping_never_reorders_within_a_group():
    """The specific keyword stays ahead of the broad one it must beat."""
    commands = [cmd("lights kitchen", "Lights"), cmd("lights", "Lights")]
    out = sort_into_groups(commands)
    assert [c["id"] for c in out] == ["lights kitchen", "lights"]


# --- Naming a group --------------------------------------------------------


def test_a_group_name_is_stored_upper_case():
    """One spelling per group, so a slip cannot split it into two."""
    assert canonical_group("Lights") == "LIGHTS"
    assert canonical_group("lights") == "LIGHTS"
    assert canonical_group("LIGHTS") == "LIGHTS"


def test_a_group_name_is_trimmed():
    assert canonical_group("  Lights  ") == "LIGHTS"


def test_no_group_stays_no_group():
    assert canonical_group("") == ""
    assert canonical_group(None) == ""
    assert canonical_group("   ") == ""


def test_accents_survive():
    assert canonical_group("caldaia però") == "CALDAIA PERÒ"
