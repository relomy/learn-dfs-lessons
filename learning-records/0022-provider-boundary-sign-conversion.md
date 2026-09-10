# Provider conventions are converted once at the adapter boundary

The learner mapped an nflverse row into a <code>VegasGameLine</code>, tested both favorite directions and a missing-line failure, then composed the adapter with <code>deriveTeamContexts</code>. They understand that provider field names and sign conventions belong in the adapter, a zero is a known pick'em while <code>null</code> is unknown data, and a source-specific conversion should occur exactly once.
