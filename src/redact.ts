/**
 * Drop named fields from a string-valued record.
 * Educational only — nothing is encrypted, hashed, or proven.
 *
 * Use this when teaching selective *omission* before selective *disclosure*
 * patterns (see wax-verifiable-credential-patterns) or deliberate non-proofs
 * (see wax-client-side-zk-attestation-interface).
 */

export type RedactOk = {
  ok: true;
  kept: Record<string, string>;
  dropped: string[];
  /** Keys still present that the caller marked sensitive. */
  sensitiveStillPresent: string[];
};

export type RedactErr = { ok: false; reason: string };

export type RedactResult = RedactOk | RedactErr;

export type RedactOptions = {
  /** Keys the product treats as sensitive (for warnings only). */
  sensitiveKeys?: readonly string[];
};

const FIELD_RE = /^[a-z][a-z0-9_]{0,31}$/;

export function isFieldName(name: string): boolean {
  return FIELD_RE.test(name);
}

export function redact(
  record: Readonly<Record<string, string>>,
  drop: readonly string[],
  options: RedactOptions = {}
): RedactResult {
  if (drop.length < 1 || drop.length > 10) {
    return { ok: false, reason: "pass 1 to 10 field names to drop" };
  }

  const seen = new Set<string>();
  for (const name of drop) {
    if (!isFieldName(name)) {
      return { ok: false, reason: `${name} is not a field name` };
    }
    if (seen.has(name)) {
      return { ok: false, reason: `${name} is repeated` };
    }
    seen.add(name);
  }

  const kept: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!seen.has(key)) kept[key] = value;
  }

  const sensitive = options.sensitiveKeys ?? [];
  const sensitiveStillPresent = sensitive.filter((k) => k in kept);

  return {
    ok: true,
    kept,
    dropped: [...seen],
    sensitiveStillPresent,
  };
}

/** True when every listed sensitive key is absent from kept. */
export function sensitiveCleared(
  kept: Readonly<Record<string, string>>,
  sensitiveKeys: readonly string[]
): boolean {
  return sensitiveKeys.every((k) => !(k in kept));
}

export type SharePreview = {
  keysShown: string[];
  keysHidden: string[];
  warning: string | null;
};

/**
 * Human-facing summary of what a share would expose.
 * Does not mutate the record.
 */
export function previewShare(
  record: Readonly<Record<string, string>>,
  drop: readonly string[],
  sensitiveKeys: readonly string[] = ["secret", "password", "private_key"]
): SharePreview | { ok: false; reason: string } {
  const result = redact(record, drop, { sensitiveKeys });
  if (!result.ok) return result;
  const warning =
    result.sensitiveStillPresent.length > 0
      ? `Still exposing sensitive keys: ${result.sensitiveStillPresent.join(", ")}`
      : null;
  return {
    keysShown: Object.keys(result.kept),
    keysHidden: result.dropped,
    warning,
  };
}
