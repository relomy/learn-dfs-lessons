# Dependency inversion keeps wiring at the edge

The learner understands that an interface such as `IPlayerSource` can represent an application-owned port, while `DraftKingsCsvAdapter` is a concrete implementation. They understand that a use case should receive the port, and that the composition root chooses and wires the concrete adapter.

## Evidence

The learner correctly distinguished interface, port, implementation, adapter, and composition root in a scenario quiz, including the reason the use case should depend on the port rather than the DraftKings adapter.
