import type { QuarterbackCandidate } from "./domain.js";
import { findTeamGameContext, type TeamGameContext } from "./vegas.js";

export type QuarterbackContextResult =
  | {
      readonly kind: "context-ready";
      readonly candidate: QuarterbackCandidate;
      readonly gameContext: TeamGameContext;
    }
  | {
      readonly kind: "missing-game-context";
      readonly candidate: QuarterbackCandidate;
      readonly team: string;
    };

export function attachTeamGameContext(
  candidate: QuarterbackCandidate,
  contexts: TeamGameContext[],
): QuarterbackContextResult {
  const lookup = findTeamGameContext(candidate.team, contexts);

  if (lookup.kind === "missing") {
    return {
      kind: "missing-game-context",
      candidate,
      team: lookup.team,
    };
  }

  return {
    kind: "context-ready",
    candidate,
    gameContext: lookup.context,
  };
}
