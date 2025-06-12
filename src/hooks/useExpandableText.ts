import { useState } from "react";

export function useExpandableText(text?: string, wordLimit: number = 30) {
  const [expanded, setExpanded] = useState(false);

  const safeText = text ?? "";
  const words = safeText.split(" ");
  const isTruncatable = words.length > wordLimit;

  const toggle = () => setExpanded((prev) => !prev);

  return {
    expanded,
    toggle,
    isTruncatable,
    fullText: safeText,
  };
}
