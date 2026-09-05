export interface SourceReference {
  readonly provider: string;
  readonly recordId: string;
}

export interface Salary {
  readonly cents: number;
}

export type Observed<T> =
  | { readonly kind: "known"; readonly value: T }
  | { readonly kind: "unknown" };

export type IdentityResolution =
  | { readonly kind: "resolved"; readonly playerId: string }
  | { readonly kind: "ambiguous"; readonly candidateIds: readonly string[] };

export interface NormalizedQuarterbackInput {
  readonly slateId: string;
  readonly displayName: string;
  readonly source: SourceReference;
  readonly identity: IdentityResolution;
  readonly salaryDollars: Observed<number>;
  readonly passingYards: Observed<number>;
  readonly passingAttempts: Observed<number>;
}

export interface QuarterbackCandidate {
  readonly playerId: string;
  readonly slateId: string;
  readonly displayName: string;
  readonly salary: Salary;
  readonly passingYards: Observed<number>;
  readonly passingAttempts: Observed<number>;
}

export type AssemblyResult =
  | { readonly kind: "ready"; readonly candidate: QuarterbackCandidate }
  | {
      readonly kind: "needs-review";
      readonly reason: "ambiguous-identity";
      readonly source: SourceReference;
      readonly candidateIds: readonly string[];
    }
  | {
      readonly kind: "rejected";
      readonly reason: "missing-salary" | "invalid-salary";
      readonly source: SourceReference;
    };

export type EvaluationResult =
  | {
      readonly kind: "scored";
      readonly playerId: string;
      readonly displayName: string;
      readonly yardsPerAttempt: number;
    }
  | {
      readonly kind: "not-evaluable";
      readonly playerId: string;
      readonly displayName: string;
      readonly reason: "missing-passing-data" | "no-passing-attempts";
    };

export type ApplicationResult =
  | { readonly kind: "evaluation-complete"; readonly evaluation: EvaluationResult }
  | { readonly kind: "review-queued"; readonly reason: "ambiguous-identity" }
  | {
      readonly kind: "rejection-recorded";
      readonly reason: "missing-salary" | "invalid-salary";
    };
