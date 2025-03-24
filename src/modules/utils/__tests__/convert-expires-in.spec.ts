import { convertExpiresIn } from "../convert-expires-in";

describe("convertExpiresIn", () => {
  it("Should return milliseconds for number input", () => {
    expect(convertExpiresIn(100)).toBe(100000);
    expect(convertExpiresIn(5)).toBe(5000);
  });

  it("Should return milliseconds for string input in minutes", () => {
    expect(convertExpiresIn("5m")).toBe(300000);
    expect(convertExpiresIn("10m")).toBe(600000);
  });

  it("Should return milliseconds for string input in hours", () => {
    expect(convertExpiresIn("1h")).toBe(3600000);
    expect(convertExpiresIn("2h")).toBe(7200000);
  });

  it("Should return milliseconds for string input in days", () => {
    expect(convertExpiresIn("1d")).toBe(86400000);
    expect(convertExpiresIn("2d")).toBe(172800000);
  });

  it("Should return 0 for invalid input", () => {
    expect(convertExpiresIn("")).toBe(0);
    expect(convertExpiresIn("abc")).toBe(0);
    expect(convertExpiresIn("5x")).toBe(0);
    expect(convertExpiresIn("1y")).toBe(0);
  });
});
