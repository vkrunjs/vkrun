import { escape, parseEscapeSQL } from "../parse-escape-sql";

describe("parseEscapeSQL", () => {
  it("Should escape special characters even without SQL keywords", () => {
    // Mapping of characters to their escaped equivalents
    const chars = {
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
    };

    for (const [input, escaped] of Object.entries(chars)) {
      expect(parseEscapeSQL(input)).toBe(`'${escaped}'`);
    }
  });

  it("Should escape SQL special characters when SQL keyword is present", () => {
    // Test all common SQL keywords combined with special characters
    const words = ["SELECT", "INSERT", "UPDATE", "DELETE", "FROM", "WHERE", "OR", "AND", "UNION", "WAITFOR", "SLEEP"];
    const specialChars = ["\0", "\b", "\t", "\n", "\r", "\x1a", '"', "'", "\\"];

    for (const word of words) {
      for (const char of specialChars) {
        const input = `${word}${char}`;
        const escapedChar = escape.ESCAPE_CHARS[char as keyof typeof escape.ESCAPE_CHARS] ?? char;
        const expected = `'${word}${escapedChar}'`;
        expect(parseEscapeSQL(input)).toBe(expected);
      }
    }
  });

  it("Should return original string if it does not contain SQL keywords or special chars", () => {
    // Strings without risk should remain unchanged
    const safeStrings = ["Hello World", "123456", "normal_text", ""];
    for (const str of safeStrings) {
      expect(parseEscapeSQL(str)).toBe(str);
    }
  });

  it("Should return non-string values as is", () => {
    // Non-string inputs are returned as-is
    expect(parseEscapeSQL(123 as any)).toBe(123);
    expect(parseEscapeSQL(true as any)).toBe(true);
    expect(parseEscapeSQL(null as any)).toBe(null);
    expect(parseEscapeSQL(undefined as any)).toBe(undefined);
  });

  it("Should escape dangerous SQL injection attempts (unique extended set)", () => {
    // Unique and complex SQL injection payloads
    const injections: [string, string][] = [
      ["mario'; DROP TABLE users; --", "'mario''; DROP TABLE users; --'"],
      ["admin'/*", "'admin''/*'"],

      // Complex comments and stacked queries
      ["1;-- -", "'1;-- -'"],
      ["0; EXEC xp_cmdshell('dir');", "'0; EXEC xp_cmdshell(''dir'');'"],

      // Time-based injections
      ["1' WAITFOR DELAY '0:0:5' --", "'1'' WAITFOR DELAY ''0:0:5'' --'"],
      ["' OR pg_sleep(5)--", "''' OR pg_sleep(5)--'"],

      // Subquery / function abuse
      ["' AND EXISTS(SELECT * FROM users WHERE name='admin')--", "''' AND EXISTS(SELECT * FROM users WHERE name=''admin'')--'"],
      ["' OR DATABASE() LIKE 'test' --", "''' OR DATABASE() LIKE ''test'' --'"],

      // Nested payloads
      ["')); EXEC sp_who--", "''')); EXEC sp_who--'"],

      // JSON & XML injections
      ["' OR JSON_EXTRACT(data, '$.role') = 'admin' --", "''' OR JSON_EXTRACT(data, ''$.role'') = ''admin'' --'"],
    ];

    for (const [input, expected] of injections) {
      expect(parseEscapeSQL(input)).toBe(expected);
    }
  });

  it("Should escape extended SQL injection scenarios including case variations, Unicode, comments, and table/column contexts", () => {
    const allTests: [string, string][] = [
      // Case variations in SQL keywords
      ["select * from users where nome='admin';", "'select * from users where nome=''admin'';'"],
      ["SeLeCt * FrOm uSeRs WhErE NoMe='AdMiN';", "'SeLeCt * FrOm uSeRs WhErE NoMe=''AdMiN'';'"],

      // Unicode / multi-byte characters
      ["' OR 1=1\u00A0--", "''' OR 1=1\u00A0--'"], // non-breaking space
      ["' OR \u041E\u0420 1=1 --", "''' OR \u041E\u0420 1=1 --'"], // Cyrillic letters

      // Comments and alternative whitespace
      ["' AND 1=1/**/--", "''' AND 1=1/**/--'"],
      ["' OR 1=1 \r\n --", "''' OR 1=1 \\r\\n --'"],
      ["' OR ''= ''", "''' OR ''''= '''''"],

      // Table/column contexts
      ["users", "users"], // safe
      ["users; DROP TABLE users;", "'users; DROP TABLE users;'"],
    ];

    for (const [input, expected] of allTests) {
      expect(parseEscapeSQL(input)).toBe(expected);
    }
  });
});
