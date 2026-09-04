# Domain values carry rules

The learner understands that an invariant is a rule that must always hold for a valid domain object, and can distinguish domain invariants from input validation. They chose integer cents or `Decimal` rather than floating point for salary, an enum for position, and a known domain set or enum for availability, with the adapter translating source strings into those values.

## Evidence

The learner proposed concrete invariants and evaluated salary as a value-object candidate, then refined the choice to avoid floating-point money representation.
