"""Load and shape a DraftKings salary file for the first project slice."""

from __future__ import annotations

import csv
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


_MATCHUP_PATTERN = re.compile(
    r"^(?P<away>[A-Z]{2,3})@(?P<home>[A-Z]{2,3}) "
    r"(?P<kickoff>\d{2}/\d{2}/\d{4} \d{2}:\d{2}[AP]M ET)$"
)


@dataclass(frozen=True)
class Player:
    source_id: str
    name: str


@dataclass(frozen=True)
class Matchup:
    away_team: str
    home_team: str
    kickoff: datetime


@dataclass(frozen=True)
class SlateEntry:
    player: Player
    position: str
    salary: int
    team: str
    matchup: Matchup
    source_status: str

    @property
    def available(self) -> bool:
        return self.source_status not in {"OUT", "IR"}


def load_available_qbs(path: Path) -> list[SlateEntry]:
    """Return available DraftKings quarterbacks, ordered by salary."""
    with path.open(encoding="utf-8-sig", newline="") as salary_file:
        entries = [_to_slate_entry(row) for row in csv.DictReader(salary_file)]

    return sorted(
        (
            entry
            for entry in entries
            if entry.position == "QB" and entry.available
        ),
        key=lambda entry: entry.salary,
        reverse=True,
    )


def _to_slate_entry(row: dict[str, str]) -> SlateEntry:
    matchup_match = _MATCHUP_PATTERN.fullmatch(row["Game Info"].strip())
    if matchup_match is None:
        raise ValueError(f"Unrecognized game information: {row['Game Info']!r}")

    matchup = Matchup(
        away_team=matchup_match["away"],
        home_team=matchup_match["home"],
        kickoff=datetime.strptime(matchup_match["kickoff"], "%m/%d/%Y %I:%M%p ET"),
    )
    return SlateEntry(
        player=Player(source_id=row["ID"], name=row["Name"]),
        position=row["Position"],
        salary=int(row["Salary"]),
        team=row["TeamAbbrev"],
        matchup=matchup,
        source_status=row["Status"].strip(),
    )
