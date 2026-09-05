import type { ApplicationResult } from "./domain.js";

export function presentApplicationResult(result: ApplicationResult): string {
  switch (result.kind) {
    case "evaluation-complete":
      if (result.evaluation.kind === "not-evaluable") {
        return `${result.evaluation.displayName}: not evaluable (${result.evaluation.reason})`;
      }
      return `${result.evaluation.displayName}: ${result.evaluation.yardsPerAttempt.toFixed(2)} passing yards per attempt`;
    case "review-queued":
      return `Review queued: ${result.reason}`;
    case "rejection-recorded":
      return `Candidate rejected: ${result.reason}`;
  }
}
