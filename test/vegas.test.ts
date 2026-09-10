import assert from "node:assert/strict";
import test from "node:test";

import { deriveTeamContexts } from "../src/vegas.js";

test("A home favorite receives the larger implied total", () => {
  assert.deepEqual(
    deriveTeamContexts({
      awayTeam: "BUF",
      homeTeam: "HOU",
      gameTotal: 48,
      homeSpread: -3,
    }),
    [
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
    ],
  );
});

test("An away favorite receives the larger implied total", () => {
  assert.deepEqual(
    deriveTeamContexts({
      awayTeam: "MIA",
      homeTeam: "NE",
      gameTotal: 55,
      homeSpread: 7,
    }),
    [
      {
        team: "MIA",
        opponent: "NE",
        gameTotal: 55,
        impliedTeamTotal: 31,
      },
      {
        team: "NE",
        opponent: "MIA",
        gameTotal: 55,
        impliedTeamTotal: 24,
      },
    ],
  );
});

test("A pick'em game (even spread) gives each team half the total", () => {
  assert.deepEqual(
    deriveTeamContexts({
      awayTeam: "KC",
      homeTeam: "PHI",
      gameTotal: 50,
      homeSpread: 0,
    }),
    [
      {
        team: "KC",
        opponent: "PHI",
        gameTotal: 50,
        impliedTeamTotal: 25,
      },
      {
        team: "PHI",
        opponent: "KC",
        gameTotal: 50,
        impliedTeamTotal: 25,
      },
    ],
  );
});

test("Implied team totals add up to the game total", () => {
  const line = {
    awayTeam: "MIA",
    homeTeam: "NE",
    gameTotal: 55,
    homeSpread: 7,
  };

  const [awayContext, homeContext] = deriveTeamContexts(line);

  assert.equal(
    awayContext.impliedTeamTotal + homeContext.impliedTeamTotal,
    line.gameTotal,
  );
});
