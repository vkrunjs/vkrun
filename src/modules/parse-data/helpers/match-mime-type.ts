export const matchMimeType = (actual: string | undefined, expected: string): boolean => {
  if (!actual) return false;
  actual = actual.split(";")[0].trim().toLowerCase();
  expected = expected.trim().toLowerCase();

  if (expected.startsWith("+")) return actual.endsWith(expected);

  const [aMain, aSub] = actual.split("/");
  const [eMain, eSub] = expected.split("/");

  if (eMain === "*" && eSub === "*") return true;
  if (eMain === "*") return aSub === eSub;
  if (eSub === "*") return aMain === eMain;

  return actual === expected;
};
