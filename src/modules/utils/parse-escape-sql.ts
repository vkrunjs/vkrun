/* eslint-disable no-control-regex */
export const escape = {
  // Matches quotes, backslash, null, etc.
  REGEX_CHARS_GLOBAL: /[\0\b\t\n\r\x1a"'\\`]/g,

  // Suspicious SQL words/signatures + comments + ; (stacked queries)
  REGEX_WORDS_SQL:
    /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|OR|AND|UNION|WAITFOR|SLEEP|EXEC|EXECUTE|DROP|ALTER|CREATE|DECLARE|CAST|CONVERT|BEGIN|END|COMMIT|ROLLBACK|MERGE|INTO|SHUTDOWN)\b|--|#|\/\*|\*\/|;/i,

  // Mapping of characters to their escaped equivalents
  ESCAPE_CHARS: {
    "\0": "\\0",
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\r": "\\r",
    "\x1a": "\\Z",
    '"': '\\"',
    "'": "''", // duplicated single quote
    "\\": "\\\\",
    "`": "\\`",
  },
};

export const parseEscapeSQL = (value: string): string => {
  if (typeof value !== "string") return value;

  const { REGEX_CHARS_GLOBAL, ESCAPE_CHARS } = escape;

  // Escape if suspicious words or special characters exist
  if (escape.REGEX_WORDS_SQL.test(value) || REGEX_CHARS_GLOBAL.test(value)) {
    let chunkIndex = (REGEX_CHARS_GLOBAL.lastIndex = 0);
    let escapedVal = "";
    let match;

    while ((match = REGEX_CHARS_GLOBAL.exec(value))) {
      const matchedChar = match[0] as keyof typeof ESCAPE_CHARS;
      const escapedChar = ESCAPE_CHARS[matchedChar] ?? matchedChar;
      escapedVal += value.slice(chunkIndex, match.index) + escapedChar;
      chunkIndex = REGEX_CHARS_GLOBAL.lastIndex;
    }

    if (chunkIndex < value.length) {
      escapedVal += value.slice(chunkIndex);
    }

    return `'${escapedVal}'`;
  }

  // If no risk detected, return the original string
  return value;
};
