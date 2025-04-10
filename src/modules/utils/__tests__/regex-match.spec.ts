import { regexMatch } from "../regex-match";

describe("regexMatch", () => {
  it("Should return true if the value matches the regex pattern", () => {
    const result = regexMatch("example@gmail.com", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    expect(result).toBeTruthy();
  });

  it("Should return false if the value does not match the regex pattern", () => {
    const result = regexMatch("example@", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    expect(result).toBeFalsy();
  });
});
