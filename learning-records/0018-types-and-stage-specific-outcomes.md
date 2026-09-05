# Types and outcomes express stage-specific facts

The learner started this implementation with no familiarity with TypeScript or discriminated unions. They now understand that a discriminated union represents a choice between explicitly shaped variants, and that TypeScript narrows the available fields after checking the discriminator. This is a narrow foothold, not general TypeScript fluency. They also understand that the idea is not unique to TypeScript. Other languages call related forms tagged unions, sum types, variants, enums, or sealed hierarchies.

## Evidence

The learner disclosed their lack of prior TypeScript and discriminated-union experience. They then identified that a `ready` assembly result must contain `candidate` and explained why unknown passing attempts reach evaluation as `not-evaluable` rather than becoming an assembly rejection.

## Implications

Future lessons must introduce TypeScript syntax before asking the learner to use it. They can connect each new feature to the architecture already learned and use Python comparisons when those reduce the language burden. Outcome names must describe what a specific stage knows: assembly currently rejects only missing or invalid salary, while evaluation returns `not-evaluable` for missing passing data or zero passing attempts.
