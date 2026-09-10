import { type VegasGameLine } from "./vegas.js";

export interface NflverseGameRow {
  readonly away_team: string;
  readonly home_team: string;
  readonly spread_line: number | null;
  readonly total_line: number | null;
}

export function toVegasGameLine(row: NflverseGameRow): VegasGameLine {
  if (row.total_line === null || row.spread_line === null) {
    throw new Error("nflverse game row is missing a total or spread line");
  }

  return {
    awayTeam: row.away_team,
    homeTeam: row.home_team,
    gameTotal: row.total_line,
    homeSpread: -row.spread_line,
  };
}
