/**
 * Drop named fields from a record. The rest stay.
 * Nothing is encrypted.
 */

export function redact(record: Readonly<Record<string, string>>, drop: readonly string[]): { ok: false; reason: string } | { ok: true; kept: Record<string, string> } {
  if (drop.length < 1 || drop.length > 10) return { ok: false, reason: "pass 1 to 10 field names to drop" };
  const seen = new Set<string>();
  for (const name of drop) {
    if (!/^[a-z][a-z0-9_]{0,31}$/.test(name)) return { ok: false, reason: `${name} is not a field name` };
    if (seen.has(name)) return { ok: false, reason: `${name} is repeated` };
    seen.add(name);
  }
  const kept: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!seen.has(key)) kept[key] = value;
  }
  return { ok: true, kept };
}
