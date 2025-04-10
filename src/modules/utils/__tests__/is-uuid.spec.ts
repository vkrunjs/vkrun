import { isUUID } from "../is-uuid";

describe("isUUID", () => {
  it("Should return true for valid UUID version 1", () => {
    expect(isUUID("bd400d66-d9e2-11ee-a506-0242ac120002", "v1")).toBeTruthy();
  });

  it("Should return true for valid UUID version 2", () => {
    expect(isUUID("000003e8-d9e2-21ee-8000-325096b39f47", "v2")).toBeTruthy();
  });

  it("Should return true for valid UUID version 3", () => {
    expect(isUUID("a3bb189e-8bf9-3888-9912-ace4e6543002", "v3")).toBeTruthy();
  });

  it("Should return true for valid UUID version 4", () => {
    expect(isUUID("5d914cff-b57c-43a8-a4ba-9b7ed306cb15", "v4")).toBeTruthy();
  });

  it("Should return true for valid UUID version 5", () => {
    expect(isUUID("a6edc906-2f9f-5fb2-a373-efac406f0ef2", "v5")).toBeTruthy();
  });

  it("Should return true for valid UUID version 6", () => {
    expect(isUUID("016b18e6-b711-6d4b-b734-0c1d207da293", "v6")).toBeTruthy();
  });

  it("Should return true for valid UUID version 7", () => {
    expect(isUUID("018e07d1-7dcf-76ac-b3af-cb7c78feb7bc", "v7")).toBeTruthy();
  });

  it("Should return false for invalid UUID", () => {
    expect(isUUID("not-a-uuid")).toBeFalsy();
  });

  it("Should return false for empty string", () => {
    expect(isUUID("")).toBeFalsy();
  });

  it("Should return false for null", () => {
    expect(isUUID(null)).toBeFalsy();
  });

  it("Should return false for undefined", () => {
    expect(isUUID(undefined)).toBeFalsy();
  });

  it("Should return false for number", () => {
    expect(isUUID(123)).toBeFalsy();
  });

  it("Should return false for array", () => {
    expect(isUUID([1, 2, 3])).toBeFalsy();
  });

  it("Should return false for object", () => {
    expect(isUUID({ key: "value" })).toBeFalsy();
  });
});
