import { describe, expect, it } from "../../../../..";

describe("Expect not.toBeFalsy Method - Success Cases", () => {
  it("should pass when a truthy value is provided", () => {
    expect(true).not.toBeFalsy(); // true é truthy
    expect(1).not.toBeFalsy(); // 1 é truthy
    expect("hello").not.toBeFalsy(); // String não vazia é truthy
    expect([1, 2, 3]).not.toBeFalsy(); // Array não vazio é truthy
    expect({ key: "value" }).not.toBeFalsy(); // Objeto não vazio é truthy
    expect(() => {}).not.toBeFalsy(); // Função é truthy
    expect(new Date()).not.toBeFalsy(); // Date é truthy
  });

  it("should pass when `true` is provided", () => {
    expect(true).not.toBeFalsy();
  });

  it("should pass when a non-empty string is provided", () => {
    expect("hello").not.toBeFalsy();
  });

  it("should pass when a non-empty array is provided", () => {
    expect([1, 2, 3]).not.toBeFalsy();
  });

  it("should pass when a non-empty object is provided", () => {
    expect({ key: "value" }).not.toBeFalsy();
  });

  it("should pass when a function is provided", () => {
    expect(() => {}).not.toBeFalsy();
  });

  it("should pass when a Date object is provided", () => {
    expect(new Date()).not.toBeFalsy();
  });
});
