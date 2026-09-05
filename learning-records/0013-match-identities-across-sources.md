# Provider identity can be a deliberate domain choice

The learner understands the distinction between a provider identity and a canonical player identity. They also understand that a provider ID may intentionally serve as the application’s canonical identity when the bounded context is permanently limited to that provider, as long as the coupling is conscious and documented.

They understand that a player identity persists across slates, while a slate entry refers to that player for one particular slate. They also understand that ambiguous matches should be represented explicitly and surfaced for review rather than silently merged.

## Evidence

The learner correctly answered the Lesson 13 quiz and applied the identity distinction to a DraftKings-only design, including the tradeoff between using the DK ID directly and introducing a provider-neutral identity mapping.
