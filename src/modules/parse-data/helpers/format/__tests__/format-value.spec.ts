import { formatValue } from "../format-value";

describe("Parse Data - Format Value", () => {
  it("Should format an array of values without escape sql", () => {
    const value = ["2000-02-03T02:00:00.000Z", "true", "false", "123", "5.56", "string", "SELECT * FROM USER;"];
    const sut = formatValue(value, false);

    expect(sut).toEqual([new Date("2000-02-03T02:00:00.000Z"), true, false, "123", "5.56", "string", "SELECT * FROM USER;"]);
  });

  it("Should format an array of values with escape sql", () => {
    const value = ["2000-02-03T02:00:00.000Z", "true", "false", "123", "5.56", "string", "SELECT * FROM USER;"];
    const sut = formatValue(value, true);

    expect(sut).toEqual([new Date("2000-02-03T02:00:00.000Z"), true, false, "123", "5.56", "string", "'SELECT * FROM USER;'"]);
  });

  it("Should format an object values using formatObjectValues without escape SQL", () => {
    const value = {
      date: "2000-02-03T02:00:00.000Z",
      truthy: "true",
      fal: "false",
      integer: "123",
      float: "5.56",
      string: "string",
      sql: "SELECT * FROM USER;",
    };

    const sut = formatValue(value, false);

    expect(sut).toEqual({
      date: new Date("2000-02-03T02:00:00.000Z"),
      truthy: true,
      fal: false,
      integer: "123",
      float: "5.56",
      string: "string",
      sql: "SELECT * FROM USER;",
    });
  });

  it("Should format an object values using formatObjectValues with escape SQL", () => {
    const value = {
      date: "2000-02-03T02:00:00.000Z",
      truthy: "true",
      fal: "false",
      integer: "123",
      float: "5.56",
      string: "string",
      sql: "SELECT * FROM USER;",
    };

    const sut = formatValue(value, true);

    expect(sut).toEqual({
      date: new Date("2000-02-03T02:00:00.000Z"),
      truthy: true,
      fal: false,
      integer: "123",
      float: "5.56",
      string: "string",
      sql: "'SELECT * FROM USER;'",
    });
  });
});
