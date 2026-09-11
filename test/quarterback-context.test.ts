import assert from "node:assert/strict";
import test from "node:test";

import {
  QuarterbackContextResult,
  attachTeamGameContext,
} from "../src/quarterback-context.js";
import { QuarterbackCandidate } from "../src/domain.js";
import { TeamGameContext } from "../src/vegas.js";

const baseCandidate: QuarterbackCandidate = {
  playerId: "player-1",
  slateId: "nfl-week-1-main",
  displayName: "Example Quarterback",
  team: "HOU",
  salary: { cents: 740000 },
  passingYards: { kind: "known", value: 280 },
  passingAttempts: { kind: "known", value: 10 },
};

const contexts: TeamGameContext[] = [
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
];

test("A team gets successfully paired with a QB", () => {
  assert.deepEqual(attachTeamGameContext(baseCandidate, contexts), {
    kind: "context-ready",
    candidate: baseCandidate,
    gameContext: {
      team: "HOU",
      opponent: "BUF",
      gameTotal: 48,
      impliedTeamTotal: 25.5,
    },
  });
});

test("A QB without a matching game returns missing-game-context", () => {
  const dalCandidate: QuarterbackCandidate = {
    playerId: "player-2",
    slateId: "nfl-week-2-main",
    displayName: "Example Quarterback #2",
    team: "DAL",
    salary: { cents: 440000 },
    passingYards: { kind: "known", value: 200 },
    passingAttempts: { kind: "known", value: 20 },
  };

  assert.deepEqual(attachTeamGameContext(dalCandidate, contexts), {
    kind: "missing-game-context",
    candidate: dalCandidate,
    team: "DAL",
  });
});
