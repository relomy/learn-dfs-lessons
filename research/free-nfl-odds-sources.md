# Free NFL game-line sources

Researched 2026-09-10. The application needs an away team, home team, game total, and a signed home spread.

## Recommendation: start with nflverse

Use the public [nflverse games CSV](https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv) for the first real source. It needs no account, key, or payment. The file currently contains scheduled 2026 games as well as historical games, and its header includes `away_team`, `home_team`, `spread_line`, and `total_line`.

The project documents `spread_line` as positive when the home team is favored and negative when the away team is favored. It documents `total_line` as the game total. See the [nflverse games data dictionary](https://github.com/nflverse/nfldata/blob/master/DATASETS.md#games). That is the opposite sign convention from our `VegasGameLine.homeSpread`, where a negative number means the home team is favored. An adapter should therefore make the conversion explicit:

```ts
homeSpread: -row.spread_line
gameTotal: row.total_line
```

Treat missing `spread_line` or `total_line` as a rejected record, not as zero. These are closing lines in the documented historical data, so this source is excellent for learning and backtesting. It also has current scheduled rows, but it should not be treated as a guaranteed live, continuously refreshed odds feed. nflverse describes its repository as [automated data releases](https://github.com/nflverse/nflverse-data) and publishes data under [CC BY 4.0](https://github.com/nflverse/nflverse-data/blob/main/LICENSE.md).

## Optional live experiment: ESPN scoreboard

The unauthenticated ESPN endpoint below returned 2026 NFL events and odds on the research date:

[`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=20260913&limit=100`](https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=20260913&limit=100)

For each event, the current response places odds at `competitions[0].odds[0]`. It includes `overUnder` and `spread`. The inspected records show `spread` is the home-side spread, so it maps directly to `VegasGameLine.homeSpread`. For example, a home favorite has a negative value and a home underdog has a positive value.

This avoids loading the DraftKings site. The response currently names DraftKings as its odds provider, but the data arrives from ESPN. The catch is important: ESPN does not publish this endpoint as a supported public API. Its shape, availability, provider, and regional behavior can change without notice. Use it only as an experimental current-slate adapter, with runtime validation and a fixture-based test. Do not let ESPN-shaped data reach domain code.

## Sources ruled out

[TheSportsDB's API documentation](https://www.thesportsdb.com/documentation) documents schedules and sports metadata, but has no documented odds, spread, or total fields. It cannot supply this feature.

## Next lesson choice

Build the first adapter against a checked-in one-row nflverse fixture. It gives us a real, free source and makes the sign conversion visible. Once that works, add ESPN as a separate experimental adapter only if current-week lines matter enough to accept an undocumented dependency.
