# Vegas lines divide a game expectation between teams

The learner implemented and tested the conversion from a game total and signed home spread to two implied team totals. They can explain negative, positive, and zero home spreads, and they added an invariant test showing that the two derived totals preserve the original game total.

## Evidence

They wrote passing tests for a home favorite, an away favorite, a pick'em game, and the sum relationship. They also explained that a favorable scoring environment is useful QB context but cannot rank a QB by itself.

## Implications

The next lesson should keep provider vocabulary at the boundary. It should turn one captured odds-provider record into a <code>VegasGameLine</code>, then pass that normalized value to the existing derivation function.
