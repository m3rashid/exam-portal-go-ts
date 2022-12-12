export const makeFirstCapital = (s: string) => {
  s = s.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};
