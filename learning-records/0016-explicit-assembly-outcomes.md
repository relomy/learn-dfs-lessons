# Assembly results make the next action explicit

The learner understands that every assembly outcome has completed its job. Ready returns a candidate for evaluation; Needs review stops safely and gives the caller evidence for resolving uncertainty; Rejected reports that the current input cannot build a valid candidate and includes diagnostic context.

## Evidence

The learner explained the three outcomes in their own words, then refined the distinction between a reviewable uncertainty and a rejected candidate after feedback.

## Implications

The next lesson can revisit the use-case boundary and trace how its caller routes Ready, Needs review, and Rejected without forcing assembly to perform evaluation, review, or presentation itself.
