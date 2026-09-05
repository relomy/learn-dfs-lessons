import { assembleQuarterbackCandidate } from "./assembly.js";
import type {
  ApplicationResult,
  AssemblyResult,
  EvaluationResult,
  NormalizedQuarterbackInput,
  QuarterbackCandidate,
} from "./domain.js";

type ReviewResult = Extract<AssemblyResult, { kind: "needs-review" }>;
type RejectedResult = Extract<AssemblyResult, { kind: "rejected" }>;

export interface ApplicationDependencies {
  readonly evaluate: (candidate: QuarterbackCandidate) => EvaluationResult;
  readonly enqueueReview: (result: ReviewResult) => void;
  readonly recordDiagnostic: (result: RejectedResult) => void;
}

export function runQuarterbackEvaluation(
  input: NormalizedQuarterbackInput,
  dependencies: ApplicationDependencies,
): ApplicationResult {
  const assembly = assembleQuarterbackCandidate(input);

  switch (assembly.kind) {
    case "ready":
      return {
        kind: "evaluation-complete",
        evaluation: dependencies.evaluate(assembly.candidate),
      };
    case "needs-review":
      dependencies.enqueueReview(assembly);
      return { kind: "review-queued", reason: assembly.reason };
    case "rejected":
      dependencies.recordDiagnostic(assembly);
      return { kind: "rejection-recorded", reason: assembly.reason };
  }
}
