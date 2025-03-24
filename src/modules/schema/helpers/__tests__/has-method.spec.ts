import { SchemaMethods } from "../../../types";
import { hasMethod } from "../has-method";

describe("hasMethod", () => {
  const methods: SchemaMethods = [{ method: "equal" }, { method: "string" }];

  it("should return true if value array contains a rule with the specified method", () => {
    expect(hasMethod(methods, "equal")).toBeTruthy();
    expect(hasMethod(methods, "string")).toBeTruthy();
  });

  it("should return false if value array does not contain a rule with the specified method", () => {
    const methods: SchemaMethods = [];
    expect(hasMethod(methods, "array")).toBeFalsy();
    expect(hasMethod(methods, "string")).toBeFalsy();
    expect(hasMethod(methods, "min")).toBeFalsy();
    expect(hasMethod(methods, "max")).toBeFalsy();
    expect(hasMethod(methods, "time")).toBeFalsy();
  });

  it("should return false if value array is empty or null", () => {
    expect(hasMethod([], "equal")).toBeFalsy();
    expect(hasMethod(null as any, "email")).toBeFalsy();
  });

  it("should return false if the method does not exist in the methods", () => {
    const methods: any = [{ maxLength: 10 }];
    expect(hasMethod(methods, "maxLength")).toBeFalsy();
  });
});
