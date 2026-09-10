import assert from "node:assert/strict";
import test from "node:test";

import type { QuarterbackCandidate } from "../src/domain.js";
import { evaluateQuarterback } from "../src/evaluation.js";

const policy = { minimumPassingAttempts: 10 };
const baseCandidate: QuarterbackCandidate = {
  playerId: "player-1",
  slateId: "nfl-week-1-main",
  displayName: "Example Quarterback",
  salary: { cents: 740000 },
  passingYards: { kind: "known", value: 280 },
  passingAttempts: { kind: "known", value: 10 },
};

test("Attempts below the minimum are not evaluable", () => {
  const candidate: QuarterbackCandidate = {
    ...baseCandidate,
    passingAttempts: { kind: "known", value: 9 },
  };

  assert.deepEqual(evaluateQuarterback(candidate, policy), {
    kind: "not-evaluable",
    playerId: "player-1",
    displayName: "Example Quarterback",
    reason: "insufficient-attempts",
  });
});

test("The minimum number of attempts is evaluable", () => {
  assert.deepEqual(evaluateQuarterback(baseCandidate, policy), {
    kind: "scored",
    playerId: "player-1",
    displayName: "Example Quarterback",
    yardsPerAttempt: 28,
  });
});
