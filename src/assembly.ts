import type {
  AssemblyResult,
  NormalizedQuarterbackInput,
} from "./domain.js";

export function assembleQuarterbackCandidate(
  input: NormalizedQuarterbackInput,
): AssemblyResult {
  if (input.identity.kind === "ambiguous") {
    return {
      kind: "needs-review",
      reason: "ambiguous-identity",
      source: input.source,
      candidateIds: input.identity.candidateIds,
    };
  }

  if (input.salaryDollars.kind === "unknown") {
    return {
      kind: "rejected",
      reason: "missing-salary",
      source: input.source,
    };
  }

  if (
    input.salaryDollars.value <= 0 ||
    !Number.isInteger(input.salaryDollars.value)
  ) {
    return {
      kind: "rejected",
      reason: "invalid-salary",
      source: input.source,
    };
  }

  return {
    kind: "ready",
    candidate: {
      playerId: input.identity.playerId,
      slateId: input.slateId,
      displayName: input.displayName,
      salary: { cents: input.salaryDollars.value * 100 },
      passingYards: input.passingYards,
      passingAttempts: input.passingAttempts,
    },
  };
}
