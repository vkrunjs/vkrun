export const getFilename = (error: Error, stackLine = 2) => {
  if (error.stack) {
    const stackLines = error.stack.split("\n");
    const callerLine = stackLines[stackLine];
    const fileMatch = callerLine.match(/\((.*?):(\d+):(\d+)\)/);

    if (fileMatch && fileMatch[1]) {
      const filePath = fileMatch[1];
      const lineNumber = fileMatch[2];
      const columnNumber = fileMatch[3];
      return `${filePath.replace(/\\/g, "/")}:${lineNumber}:${columnNumber}`;
    }
  }
  return "";
};
