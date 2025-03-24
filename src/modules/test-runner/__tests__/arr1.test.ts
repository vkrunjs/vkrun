import { describe, it, expect } from "..";
import { arrTest } from "./array";

describe("Math Tests", () => {
  it("should add two numbers correctly", () => {
    expect(arrTest).toEqual([123]);
    arrTest.push(321);
    expect(arrTest).toEqual([123, 321]);
  });
});
