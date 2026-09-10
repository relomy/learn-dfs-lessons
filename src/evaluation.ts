import type { EvaluationResult, QuarterbackCandidate } from "./domain.js";

export interface QuarterbackEvaluationPolicy {
  readonly minimumPassingAttempts: number;
}

export function evaluateQuarterback(
  candidate: QuarterbackCandidate,
  policy: QuarterbackEvaluationPolicy,
): EvaluationResult {
  if (
    candidate.passingYards.kind === "unknown" ||
    candidate.passingAttempts.kind === "unknown"
  ) {
    return {
      kind: "not-evaluable",
      playerId: candidate.playerId,
      displayName: candidate.displayName,
      reason: "missing-passing-data",
    };
  }

  if (candidate.passingAttempts.value === 0) {
    return {
      kind: "not-evaluable",
      playerId: candidate.playerId,
      displayName: candidate.displayName,
      reason: "no-passing-attempts",
    };
  }

  if (candidate.passingAttempts.value < policy.minimumPassingAttempts) {
    return {
      kind: "not-evaluable",
      playerId: candidate.playerId,
      displayName: candidate.displayName,
      reason: "insufficient-attempts",
    };
  }

  return {
    kind: "scored",
    playerId: candidate.playerId,
    displayName: candidate.displayName,
    yardsPerAttempt:
      candidate.passingYards.value / candidate.passingAttempts.value,
  };
}
