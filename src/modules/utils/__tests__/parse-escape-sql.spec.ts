import { parseEscapeSQL } from "../parse-escape-sql";

describe("parseEscapeSQL", () => {
  it("Do not escape chars if there is no sql word", () => {
    expect(parseEscapeSQL("\0")).toBe("\0");
    expect(parseEscapeSQL("\b")).toBe("\b");
    expect(parseEscapeSQL("\t")).toBe("\t");
    expect(parseEscapeSQL("\n")).toBe("\n");
    expect(parseEscapeSQL("\r")).toBe("\r");
    expect(parseEscapeSQL("\x1a")).toBe("\x1a");
    expect(parseEscapeSQL('"')).toBe('"');
    expect(parseEscapeSQL("'")).toBe("'");
    expect(parseEscapeSQL("\\")).toBe("\\");
  });

  it("Should escape SQL special characters when SQL word is present", () => {
    expect(parseEscapeSQL("SELECT \0")).toBe("'SELECT \\0'");
    expect(parseEscapeSQL("SELECT \b")).toBe("'SELECT \\b'");
    expect(parseEscapeSQL("SELECT \t")).toBe("'SELECT \\t'");
    expect(parseEscapeSQL("SELECT \n")).toBe("'SELECT \\n'");
    expect(parseEscapeSQL("SELECT \r")).toBe("'SELECT \\r'");
    expect(parseEscapeSQL("SELECT \x1a")).toBe("'SELECT \\Z'");
    expect(parseEscapeSQL('SELECT "')).toBe("'SELECT \\\"'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("SELECT '")).toBe("'SELECT \\\''");
    expect(parseEscapeSQL("SELECT \\")).toBe("'SELECT \\\\'");

    expect(parseEscapeSQL("INSERT \0")).toBe("'INSERT \\0'");
    expect(parseEscapeSQL("INSERT \b")).toBe("'INSERT \\b'");
    expect(parseEscapeSQL("INSERT \t")).toBe("'INSERT \\t'");
    expect(parseEscapeSQL("INSERT \n")).toBe("'INSERT \\n'");
    expect(parseEscapeSQL("INSERT \r")).toBe("'INSERT \\r'");
    expect(parseEscapeSQL("INSERT \x1a")).toBe("'INSERT \\Z'");
    expect(parseEscapeSQL('INSERT "')).toBe("'INSERT \\\"'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("INSERT '")).toBe("'INSERT \\\''");
    expect(parseEscapeSQL("INSERT \\")).toBe("'INSERT \\\\'");
    expect(parseEscapeSQL("UPDATE \0")).toBe("'UPDATE \\0'");
    expect(parseEscapeSQL("UPDATE \b")).toBe("'UPDATE \\b'");
    expect(parseEscapeSQL("UPDATE \t")).toBe("'UPDATE \\t'");
    expect(parseEscapeSQL("UPDATE \n")).toBe("'UPDATE \\n'");
    expect(parseEscapeSQL("UPDATE \r")).toBe("'UPDATE \\r'");
    expect(parseEscapeSQL("UPDATE \x1a")).toBe("'UPDATE \\Z'");
    expect(parseEscapeSQL('UPDATE "')).toBe("'UPDATE \\\"'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("UPDATE '")).toBe("'UPDATE \\\''");
    expect(parseEscapeSQL("UPDATE \\")).toBe("'UPDATE \\\\'");
    expect(parseEscapeSQL("DELETE \0")).toBe("'DELETE \\0'");
    expect(parseEscapeSQL("DELETE \b")).toBe("'DELETE \\b'");
    expect(parseEscapeSQL("DELETE \t")).toBe("'DELETE \\t'");
    expect(parseEscapeSQL("DELETE \n")).toBe("'DELETE \\n'");
    expect(parseEscapeSQL("DELETE \r")).toBe("'DELETE \\r'");
    expect(parseEscapeSQL("DELETE \x1a")).toBe("'DELETE \\Z'");
    expect(parseEscapeSQL('DELETE "')).toBe("'DELETE \\\"'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("DELETE '")).toBe("'DELETE \\\''");
    expect(parseEscapeSQL("DELETE \\")).toBe("'DELETE \\\\'");
    expect(parseEscapeSQL("FROM \0")).toBe("'FROM \\0'");
    expect(parseEscapeSQL("FROM \b")).toBe("'FROM \\b'");
    expect(parseEscapeSQL("FROM \t")).toBe("'FROM \\t'");
    expect(parseEscapeSQL("FROM \n")).toBe("'FROM \\n'");
    expect(parseEscapeSQL("FROM \r")).toBe("'FROM \\r'");
    expect(parseEscapeSQL("FROM \x1a")).toBe("'FROM \\Z'");
    expect(parseEscapeSQL('FROM "')).toBe("'FROM \\\"'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("FROM '")).toBe("'FROM \\\''");
    expect(parseEscapeSQL("FROM \\")).toBe("'FROM \\\\'");
    expect(parseEscapeSQL("WHERE \0")).toBe("'WHERE \\0'");
    expect(parseEscapeSQL("WHERE \b")).toBe("'WHERE \\b'");
    expect(parseEscapeSQL("WHERE \t")).toBe("'WHERE \\t'");
    expect(parseEscapeSQL("WHERE \n")).toBe("'WHERE \\n'");
    expect(parseEscapeSQL("WHERE \r")).toBe("'WHERE \\r'");
    expect(parseEscapeSQL("WHERE \x1a")).toBe("'WHERE \\Z'");
    expect(parseEscapeSQL('WHERE "')).toBe("'WHERE \\\"'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("WHERE '")).toBe("'WHERE \\\''");
    expect(parseEscapeSQL("WHERE \\")).toBe("'WHERE \\\\'");
    expect(parseEscapeSQL("SELECT")).toBe("'SELECT'");
    expect(parseEscapeSQL("SELECT \0 end")).toBe("'SELECT \\0 end'");
    expect(parseEscapeSQL("SELECT \b end")).toBe("'SELECT \\b end'");
    expect(parseEscapeSQL("SELECT \t end")).toBe("'SELECT \\t end'");
    expect(parseEscapeSQL("SELECT \n end")).toBe("'SELECT \\n end'");
    expect(parseEscapeSQL("SELECT \r end")).toBe("'SELECT \\r end'");
    expect(parseEscapeSQL("SELECT \x1a end")).toBe("'SELECT \\Z end'");
    expect(parseEscapeSQL('SELECT " end')).toBe("'SELECT \\\" end'");
    // eslint-disable-next-line no-useless-escape
    expect(parseEscapeSQL("SELECT ' end")).toBe("'SELECT \\\' end'");
    expect(parseEscapeSQL("SELECT \\ end")).toBe("'SELECT \\\\ end'");
  });

  it("Should escape special characters in SQL string containing SQL keywords", () => {
    expect(parseEscapeSQL("SELECT * FROM table WHERE column = 'value'")).toBe(
      "'SELECT * FROM table WHERE column = \\'value\\''",
    );
    expect(parseEscapeSQL("SELECT 'value'")).toBe("'SELECT \\'value\\''");
    expect(parseEscapeSQL("SELECT")).toBe("'SELECT'");
    expect(parseEscapeSQL("SELECT 'value' end")).toBe("'SELECT \\'value\\' end'");
  });

  it("Should return original string if it does not contain SQL keywords", () => {
    expect(parseEscapeSQL("This is a test string")).toBe("This is a test string");
  });

  it("Should return original string if it is empty", () => {
    expect(parseEscapeSQL("")).toBe("");
  });
});
