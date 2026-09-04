# Mission: Learn software architecture by building a DFS analytics system

## Why

Design and build a maintainable DFS player-evaluation system that combines
heterogeneous statistics, matchup data, salary data, and position-specific
scoring models.

The project is also a way to learn software architecture through the work
itself. The system and the learning have equal priority.

We will use the project to become comfortable with domain modeling,
separation of concerns, data pipelines, adapters and external integrations,
normalization, feature engineering, strategy and polymorphic designs,
configuration-driven systems, databases and historical data, APIs and
presentation layers, testing architecture, and evaluating architectural
tradeoffs.

## Success looks like

- Build a working quarterback evaluation slice for one NFL DFS slate.
- Acquire and combine data from multiple external sources.
- Model position-specific scoring as a real concept, while implementing only
  quarterbacks at first.
- Add additional positions without rewriting the system's core.
- Make, test, and revisit architectural decisions as requirements change.
- Understand the tradeoffs behind the system's structure.

## Constraints

- Learn concepts through implementation rather than lectures.
- Start with quarterbacks as the first slice.
- Add complexity incrementally.
- Prefer simple designs until complexity justifies abstraction.
- Make architectural decisions before receiving explanations.
- Revisit earlier architectural decisions as requirements change.
- Keep technology choices subordinate to the architectural learning goals.

## Out of scope

- Supporting every position in the first milestone.
- A polished production system at the beginning.
- Treating explainability as a required feature of the initial mission.
