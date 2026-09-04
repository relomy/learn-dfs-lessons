# Source adapters translate; slate concepts belong in the domain

The learner can describe a source adapter as the boundary that translates raw DraftKings rows into application-owned domain values, while distinguishing row-level rejection from file-level failure. They also recognized that salary, matchup, and availability are slate-specific, and that the existing prototype's `SlateEntry` name and structure should be reconsidered rather than accepted automatically.

## Evidence

The learner questioned whether `Player` should be the primary domain model and correctly separated that concern from the adapter boundary. This establishes readiness to examine domain concepts and names using the system's use cases.
