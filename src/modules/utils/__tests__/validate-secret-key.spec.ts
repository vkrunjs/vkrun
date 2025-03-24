import { validateSecretKey } from "../validate-secret-key";

describe("validateSecretKey", () => {
  it("Should throw error if secretKey is not a string or string array", () => {
    expect(() => validateSecretKey(null as any, "module")).toThrow(
      "vkrun-module: the secret key must be a string or a string array.",
    );
    expect(() => validateSecretKey(undefined as any, "module")).toThrow(
      "vkrun-module: the secret key must be a string or a string array.",
    );
    expect(() => validateSecretKey(123 as any, "module")).toThrow(
      "vkrun-module: the secret key must be a string or a string array.",
    );
    expect(() => validateSecretKey(true as any, "module")).toThrow(
      "vkrun-module: the secret key must be a string or a string array.",
    );
    expect(() => validateSecretKey({} as any, "module")).toThrow(
      "vkrun-module: the secret key must be a string or a string array.",
    );
  });

  it("Should throw error if secretKey is a string but not a SHA-256 hash", () => {
    expect(() => validateSecretKey("not-a-sha256-hash", "module")).toThrow(
      "vkrun-module: the secret keys must be strings of 64 characters representing 32 bytes.",
    );
  });

  it("Should throw error if secretKey is an array containing non-string or non-SHA-256 strings", () => {
    expect(() => validateSecretKey(["not-a-sha256-hash"], "module")).toThrow(
      "vkrun-module: all secret keys must be strings of 64 characters representing 32 bytes.",
    );
    expect(() => validateSecretKey(["not-a-sha256-hash", "another-invalid-key"], "module")).toThrow(
      "vkrun-module: all secret keys must be strings of 64 characters representing 32 bytes.",
    );
  });

  it("Should not throw error if secretKey is a valid SHA-256 string", () => {
    expect(() => validateSecretKey("0123456789012345678901234567890123456789012345678901234567890123", "module")).not.toThrow();
  });

  it("Should not throw error if secretKey is an array of valid SHA-256 strings", () => {
    expect(() =>
      validateSecretKey(["0123456789012345678901234567890123456789012345678901234567890123"], "module"),
    ).not.toThrow();
    expect(() =>
      validateSecretKey(
        [
          "0123456789012345678901234567890123456789012345678901234567890123",
          "0123456789012345678901234567890123456789012345678901234567890123",
        ],
        "module",
      ),
    ).not.toThrow();
  });
});
