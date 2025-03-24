export const printSafe = (message: string) => {
  const MAX_SIZE = 500;
  const SAFE_LINE_LENGTH = 150;
  const MAX_LINES = 30;

  if (typeof message === "string") {
    if (message.length > MAX_SIZE) {
      message = `${message.slice(0, MAX_SIZE)}...`;
    }

    const lines = message.match(new RegExp(`.{1,${SAFE_LINE_LENGTH}}`, "g")) || [];

    if (lines.length > MAX_LINES) {
      return [...lines.slice(0, MAX_LINES), "      ..."].join("\n");
    }

    return lines.join("\n");
  }

  return message;
};
