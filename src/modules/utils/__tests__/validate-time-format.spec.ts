import { validateTimeFormat } from "../validate-time-format";

describe("validateTimeFormat", () => {
  it("Should throw error if expiresIn is not a number or string", () => {
    expect(() => validateTimeFormat(null as any, "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
    expect(() => validateTimeFormat(undefined as any, "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
    expect(() => validateTimeFormat(true as any, "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
    expect(() => validateTimeFormat([] as any, "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
    expect(() => validateTimeFormat({} as any, "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
  });

  it("Should throw error if expiresIn is a string but not in valid format", () => {
    expect(() => validateTimeFormat("not-valid-format", "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
    expect(() => validateTimeFormat("5x", "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
    expect(() => validateTimeFormat("5", "module")).toThrow(
      'vkrun-module: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".',
    );
  });

  it("Should not throw error if expiresIn is a number", () => {
    expect(() => validateTimeFormat(10, "module")).not.toThrow();
  });

  it("Should not throw error if expiresIn is a string in valid format", () => {
    expect(() => validateTimeFormat("5m", "module")).not.toThrow();
    expect(() => validateTimeFormat("3h", "module")).not.toThrow();
    expect(() => validateTimeFormat("2d", "module")).not.toThrow();
  });
});
