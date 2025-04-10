import { parseEscapeHTML } from "../parse-escape-html";

describe("parseEscapeHTML", () => {
  it("Should return the original string if no characters need escaping", () => {
    expect(parseEscapeHTML("Hello, world!")).toBe("Hello, world!");
    expect(parseEscapeHTML("This is a test")).toBe("This is a test");
  });

  it("Should escape HTML special characters", () => {
    expect(parseEscapeHTML('"')).toBe("&quot;");
    expect(parseEscapeHTML("&")).toBe("&amp;");
    expect(parseEscapeHTML("'")).toBe("&#39;");
    expect(parseEscapeHTML("<")).toBe("&lt;");
    expect(parseEscapeHTML(">")).toBe("&gt;");
  });

  it("Should escape HTML special characters within a string", () => {
    expect(parseEscapeHTML('This is a "test"')).toBe("This is a &quot;test&quot;");
    expect(parseEscapeHTML("<p>Hello, world!</p>")).toBe("&lt;p&gt;Hello, world!&lt;/p&gt;");
    expect(parseEscapeHTML("& < > \" '")).toBe("&amp; &lt; &gt; &quot; &#39;");
  });

  it("Should handle empty string", () => {
    expect(parseEscapeHTML("")).toBe("");
  });

  it("Should handle string with only special characters", () => {
    expect(parseEscapeHTML("\"&'<>")).toBe("&quot;&amp;&#39;&lt;&gt;");
  });

  it("Should append remaining characters if lastIndex is not at the end of the string", () => {
    expect(parseEscapeHTML("This is a test")).toBe("This is a test");
    expect(parseEscapeHTML("This is a test <span>")).toBe("This is a test &lt;span&gt;");
  });

  it("Should append remaining characters if lastIndex is not at the end of the string (multiple escapes)", () => {
    expect(parseEscapeHTML('This is a test "')).toBe("This is a test &quot;");
    expect(parseEscapeHTML("This is a test &")).toBe("This is a test &amp;");
    expect(parseEscapeHTML("This is a test '")).toBe("This is a test &#39;");
    expect(parseEscapeHTML("This is a test <")).toBe("This is a test &lt;");
    expect(parseEscapeHTML("This is a test >")).toBe("This is a test &gt;");
  });
});
