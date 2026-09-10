# Policy configuration separates choice from application

The learner understands that <code>minimumPassingAttempts</code> names an adjustable business rule instead of hiding it in evaluator code. They can distinguish <code>main.ts</code> choosing a concrete policy from <code>evaluation.ts</code> applying it, and understand that the wrapper adapts the evaluator's two inputs to the application's one-argument dependency.

## Evidence

They identified configurability as the reason to name the threshold, then asked focused questions about ownership and the wrapper's purpose. They also recognized that a direct evaluator test isolates policy behavior from assembly and routing.

## Implications

The next increment should apply the existing boundary and normalization concepts to one local source file. Avoid adding more policy abstractions until a real source creates a reason for them.
