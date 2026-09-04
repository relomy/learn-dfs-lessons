from datetime import datetime
import unittest
from pathlib import Path

from dfs_analytics.slice_one import load_available_qbs


SALARY_FILE = Path("data/raw/draftkings/2026-09-13-main-slate.csv")


class SliceOneTests(unittest.TestCase):
    def test_loads_available_quarterbacks_in_salary_order(self):
        qbs = load_available_qbs(SALARY_FILE)

        self.assertEqual(len(qbs), 87)
        self.assertEqual(
            [qb.player.name for qb in qbs[:3]],
            ["Josh Allen", "Joe Burrow", "Lamar Jackson"],
        )
        self.assertTrue(all(qb.position == "QB" for qb in qbs))
        self.assertTrue(
            all(qbs[index].salary >= qbs[index + 1].salary for index in range(len(qbs) - 1))
        )


    def test_keeps_questionable_players(self):
        qbs = load_available_qbs(SALARY_FILE)

        penix = next(qb for qb in qbs if qb.player.name == "Michael Penix Jr.")

        self.assertEqual(penix.source_status, "Q")
        self.assertTrue(penix.available)


    def test_parses_matchup_and_kickoff(self):
        qbs = load_available_qbs(SALARY_FILE)
        allen = qbs[0]

        self.assertEqual(allen.matchup.away_team, "BUF")
        self.assertEqual(allen.matchup.home_team, "HOU")
        self.assertEqual(allen.matchup.kickoff, datetime(2026, 9, 13, 13, 0))
