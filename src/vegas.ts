export interface VegasGameLine {
  readonly awayTeam: string;
  readonly homeTeam: string;
  readonly gameTotal: number;
  readonly homeSpread: number;
}

export interface TeamGameContext {
  readonly team: string;
  readonly opponent: string;
  readonly gameTotal: number;
  readonly impliedTeamTotal: number;
}

export function deriveTeamContexts(
  gameLine: VegasGameLine,
): readonly [TeamGameContext, TeamGameContext] {
  const homeImpliedTeamTotal = gameLine.gameTotal / 2 - gameLine.homeSpread / 2;
  const awayImpliedTeamTotal = gameLine.gameTotal / 2 + gameLine.homeSpread / 2;

  return [
    {
      team: gameLine.awayTeam,
      opponent: gameLine.homeTeam,
      gameTotal: gameLine.gameTotal,
      impliedTeamTotal: awayImpliedTeamTotal,
    },
    {
      team: gameLine.homeTeam,
      opponent: gameLine.awayTeam,
      gameTotal: gameLine.gameTotal,
      impliedTeamTotal: homeImpliedTeamTotal,
    },
  ];
}
