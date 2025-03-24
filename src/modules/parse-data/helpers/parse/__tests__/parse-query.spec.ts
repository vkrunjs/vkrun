import { parseQuery } from "../parse-query";

describe("Parse Data - Parse Query", () => {
  it("Should parse the url and return an object with the data if the url is not empty", () => {
    const query = "string=any@mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z";
    const request: any = { url: `/query?${query}` };

    const sut = parseQuery(request, false);

    expect(sut).toEqual({
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
      float: "1.56",
      integer: "123",
      string: "any@mail.com",
    });
  });

  it("Should parse the url and return an object with the data if the url is not empty with escape SQL", () => {
    const query = "sql=SELECT * FROM USER;";
    const request: any = { url: `/query?${query}` };

    const sut = parseQuery(request, true);

    expect(sut).toEqual({
      sql: "'SELECT * FROM USER;'",
    });
  });

  it("Should parse the url and return an object empty if the url is empty", () => {
    const request: any = { url: "" };

    const sut = parseQuery(request, false);

    expect(sut).toEqual({});
  });

  it("Should parse the url and return an object empty if the url is undefined", () => {
    const request: any = { url: undefined };

    const sut = parseQuery(request, false);

    expect(sut).toEqual({});
  });
});
