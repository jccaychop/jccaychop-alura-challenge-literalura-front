export const capitalize = (text?: string): string => {
  const safeText = text?.trim() ?? "";
  return safeText.charAt(0).toUpperCase() + safeText.slice(1).toLowerCase();
};
