import assert from "node:assert/strict";
import test from "node:test";

import { assembleQuarterbackCandidate } from "../src/assembly.js";
import type { NormalizedQuarterbackInput } from "../src/domain.js";

const input: NormalizedQuarterbackInput = {
  slateId: "nfl-week-1-main",
  displayName: "Example Quarterback",
  team: "HOU",
  source: { provider: "lesson-fixture", recordId: "qb-1" },
  identity: { kind: "resolved", playerId: "player-1" },
  salaryDollars: { kind: "known", value: 7400 },
  passingYards: { kind: "known", value: 280 },
  passingAttempts: { kind: "known", value: 35 },
};

test("Carries team identity into an assembled candidate", () => {
  const result = assembleQuarterbackCandidate(input);

  assert.deepEqual(result, {
    kind: "ready",
    candidate: {
      playerId: "player-1",
      slateId: "nfl-week-1-main",
      displayName: "Example Quarterback",
      team: "HOU",
      salary: { cents: 740000 },
      passingYards: { kind: "known", value: 280 },
      passingAttempts: { kind: "known", value: 35 },
    },
  });
});
