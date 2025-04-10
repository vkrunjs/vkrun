export const html = (strings: TemplateStringsArray, ...values: unknown[]): string =>
  strings.reduce((acc, str, i) => {
    const value = values[i];
    return acc + str + (typeof value === "string" ? value : String(value ?? ""));
  }, "");
