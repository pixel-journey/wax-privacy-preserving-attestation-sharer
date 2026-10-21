import { ATOMIC_ORIGIN } from "./api";
import { redact } from "./redact";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const result = redact({ name: "Oak", secret: "hide" }, ["secret"]);
if (!result.ok) throw new Error(result.reason);

export const USE_CASES: UseCase[] = [
  {
    title: "A template is not this record",
    detail: `secret is dropped. Kept: ${Object.keys(result.kept).join(", ")}. The template request is not sent. Nothing is encrypted.`,
    request: { method: "GET", url: `${ATOMIC_ORIGIN}/atomicassets/v1/templates/pixeljourney/1`, executed: false },
    transaction: null,
  },
  {
    title: "An asset is not a share",
    detail: "No privacy action is built.",
    request: { method: "GET", url: `${ATOMIC_ORIGIN}/atomicassets/v1/assets/1`, executed: false },
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (!result.ok || !("name" in result.kept) || "secret" in result.kept) throw new Error("redact");
}
