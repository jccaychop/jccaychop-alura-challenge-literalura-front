export const reverseText = (text: string): string => {
  return text
    .split(",")
    .map((t) => t.trim())
    .reverse()
    .join(" ");
};
