import { runQuarterbackEvaluation } from "./application.js";
import type { NormalizedQuarterbackInput } from "./domain.js";
import { evaluateQuarterback } from "./evaluation.js";
import { presentApplicationResult } from "./presentation.js";

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

const evaluationPolicy = { minimumPassingAttempts: 10 };

const result = runQuarterbackEvaluation(input, {
  evaluate: (candidate) => evaluateQuarterback(candidate, evaluationPolicy),
  enqueueReview: () => undefined,
  recordDiagnostic: () => undefined,
});

console.log(presentApplicationResult(result));
