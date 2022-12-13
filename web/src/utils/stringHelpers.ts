export const makeFirstCapital = (s: string) => {
  return s
    .toLowerCase()
    .split("_")
    .map((r) => r.charAt(0).toUpperCase() + r.slice(1))
    .join(" ");
};
