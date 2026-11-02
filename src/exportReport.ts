import type { RedactOk } from "./redact";

export function exportRedactMarkdown(
  title: string,
  originalKeys: string[],
  result: RedactOk
): string {
  const lines = [
    `# ${title}`,
    "",
    "> Educational field omission — not encryption, not ZK.",
    "",
    "## Original keys",
    "",
    ...originalKeys.map((k) => `- ${k}`),
    "",
    "## Dropped",
    "",
    ...result.dropped.map((k) => `- ${k}`),
    "",
    "## Kept",
    "",
    ...Object.keys(result.kept).map((k) => `- ${k}: ${JSON.stringify(result.kept[k])}`),
    "",
  ];
  if (result.sensitiveStillPresent.length) {
    lines.push(
      "## Warning",
      "",
      `Sensitive still present: ${result.sensitiveStillPresent.join(", ")}`,
      ""
    );
  }
  lines.push("Nothing was encrypted. The original record is unchanged.", "");
  return lines.join("\n");
}

export function downloadText(filename: string, content: string): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
