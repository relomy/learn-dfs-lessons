import assert from "node:assert/strict";
import test from "node:test";

import { toVegasGameLine, type NflverseGameRow } from "../src/nflverse.js";
import { deriveTeamContexts } from "../src/vegas.js";

test("Maps an nflverse home-favorite line to a negative home spread", () => {
  const row: NflverseGameRow = {
    away_team: "BUF",
    home_team: "HOU",
    spread_line: 3,
    total_line: 48,
  };

  assert.deepEqual(toVegasGameLine(row), {
    awayTeam: "BUF",
    homeTeam: "HOU",
    gameTotal: 48,
    homeSpread: -3,
  });
});

test("Maps an nflverse away-favorite line to a positive home spread", () => {
  const row: NflverseGameRow = {
    away_team: "MIA",
    home_team: "NE",
    spread_line: -7,
    total_line: 51,
  };

  assert.deepEqual(toVegasGameLine(row), {
    awayTeam: "MIA",
    homeTeam: "NE",
    gameTotal: 51,
    homeSpread: 7,
  });
});

test("Rejects a row with no spread line", () => {
  const row: NflverseGameRow = {
    away_team: "MIA",
    home_team: "NE",
    spread_line: null,
    total_line: 51,
  };

  assert.throws(() => toVegasGameLine(row), /missing a total or spread line/);
});

test("Maps an nflverse row into team contexts", () => {
  const row: NflverseGameRow = {
    away_team: "BUF",
    home_team: "HOU",
    spread_line: 3,
    total_line: 48,
  };

  assert.deepEqual(deriveTeamContexts(toVegasGameLine(row)), [
    {
      team: "BUF",
      opponent: "HOU",
      gameTotal: 48,
      impliedTeamTotal: 22.5,
    },
    {
      team: "HOU",
      opponent: "BUF",
      gameTotal: 48,
      impliedTeamTotal: 25.5,
    },
  ]);
});
