import assert from "node:assert/strict";
import test from "node:test";

import {
  type ApplicationDependencies,
  runQuarterbackEvaluation,
} from "../src/application.js";
import type {
  AssemblyResult,
  NormalizedQuarterbackInput,
} from "../src/domain.js";
import { evaluateQuarterback } from "../src/evaluation.js";

const baseInput: NormalizedQuarterbackInput = {
  slateId: "nfl-week-1-main",
  displayName: "Example Quarterback",
  source: { provider: "lesson-fixture", recordId: "qb-1" },
  identity: { kind: "resolved", playerId: "player-1" },
  salaryDollars: { kind: "known", value: 7400 },
  passingYards: { kind: "known", value: 280 },
  passingAttempts: { kind: "known", value: 35 },
};

function dependencyRecorder() {
  const reviews: Extract<AssemblyResult, { kind: "needs-review" }>[] = [];
  const diagnostics: Extract<AssemblyResult, { kind: "rejected" }>[] = [];
  const dependencies: ApplicationDependencies = {
    evaluate: evaluateQuarterback,
    enqueueReview: (result) => reviews.push(result),
    recordDiagnostic: (result) => diagnostics.push(result),
  };
  return { dependencies, reviews, diagnostics };
}

test("Ready reaches the evaluation policy", () => {
  const recorder = dependencyRecorder();

  const result = runQuarterbackEvaluation(baseInput, recorder.dependencies);

  assert.deepEqual(result, {
    kind: "evaluation-complete",
    evaluation: {
      kind: "scored",
      playerId: "player-1",
      displayName: "Example Quarterback",
      yardsPerAttempt: 8,
    },
  });
  assert.equal(recorder.reviews.length, 0);
  assert.equal(recorder.diagnostics.length, 0);
});

test("Ready can become NotEvaluable inside the policy", () => {
  const recorder = dependencyRecorder();
  const input: NormalizedQuarterbackInput = {
    ...baseInput,
    passingAttempts: { kind: "unknown" },
  };

  const result = runQuarterbackEvaluation(input, recorder.dependencies);

  assert.deepEqual(result, {
    kind: "evaluation-complete",
    evaluation: {
      kind: "not-evaluable",
      playerId: "player-1",
      displayName: "Example Quarterback",
      reason: "missing-passing-data",
    },
  });
  assert.equal(recorder.reviews.length, 0);
  assert.equal(recorder.diagnostics.length, 0);
});

test("NeedsReview reaches the review queue", () => {
  const recorder = dependencyRecorder();
  const input: NormalizedQuarterbackInput = {
    ...baseInput,
    identity: {
      kind: "ambiguous",
      candidateIds: ["player-1", "player-2"],
    },
  };

  const result = runQuarterbackEvaluation(input, recorder.dependencies);

  assert.deepEqual(result, {
    kind: "review-queued",
    reason: "ambiguous-identity",
  });
  assert.equal(recorder.reviews.length, 1);
  assert.equal(recorder.diagnostics.length, 0);
});

test("Rejected reaches diagnostics", () => {
  const recorder = dependencyRecorder();
  const input: NormalizedQuarterbackInput = {
    ...baseInput,
    salaryDollars: { kind: "unknown" },
  };

  const result = runQuarterbackEvaluation(input, recorder.dependencies);

  assert.deepEqual(result, {
    kind: "rejection-recorded",
    reason: "missing-salary",
  });
  assert.equal(recorder.reviews.length, 0);
  assert.equal(recorder.diagnostics.length, 1);
});
