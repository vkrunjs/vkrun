import { readFileSync } from "../../../../runtime";
import { bold, dim, red } from "../../output-colors";

export const getErrorContext = (filenameWithLine: string) => {
  const regex = /^(.*):(\d+):(\d+)$/;
  const match = filenameWithLine.match(regex);

  if (!match) {
    return "Error: Invalid file path or line number";
  }

  const filePath = match[1];
  const lineNumber = Number(match[2]);
  const columnNumber = Number(match[3]);

  try {
    const fileContent = readFileSync(filePath, "utf8").split("\n");
    const startLine = Math.max(lineNumber - 3, 0);
    const endLine = Math.min(lineNumber + 2, fileContent.length);

    const context = fileContent
      .slice(startLine, endLine)
      .map((line, index) => {
        const lineNumberIndicator =
          index + startLine + 1 === lineNumber
            ? `${red(bold(`>`))} ` + `${String(index + startLine + 1).padStart(3, " ")} | `
            : dim(`      ${String(index + startLine + 1).padStart(3, " ")} | `);

        const lineWithPointer = `${lineNumberIndicator}${index + startLine + 1 === lineNumber ? line : dim(line)}`;
        if (index + startLine + 1 === lineNumber) {
          return `    ${lineWithPointer}\n            ${" ".repeat(columnNumber - 1)}${red(bold(`^`))}`;
        }
        return lineWithPointer;
      })
      .join("\n");

    return `\n${context}`;
  } catch (error) {
    return `Error reading file: ${filePath}`;
  }
};
