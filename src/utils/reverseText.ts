export const reverseText = (text?: string): string => {
  if (!text) return "";

  return text
    .split(",")
    .map((t) => t.trim())
    .reverse()
    .join(" ");
};
