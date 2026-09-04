# An input contract protects the domain boundary

The learner can distinguish source-specific fields from fields required by the
first domain slice. They understand that an adapter should validate and
translate external values before creating domain objects: for example, a
salary string becomes a numeric value, a position code becomes a domain value,
and game text becomes a `Matchup`.

The learner also understands the difference between file-level and row-level
failure. Missing required columns should fail the import early; one malformed
row should normally be rejected and reported while valid rows continue through
the pipeline. The first slice should fail only when the input is structurally
unusable or no valid QB entries remain.
