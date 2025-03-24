import { isDataView } from "../is-data-view";

describe("isDataView", () => {
  it("should return true for DataView", () => {
    const buffer = new ArrayBuffer(8);
    const dataView = new DataView(buffer);
    expect(isDataView(dataView)).toBeTruthy();
  });

  it("should return false for non-DataView types", () => {
    const buffer = new ArrayBuffer(8);
    expect(isDataView(new Uint32Array([1, 2, 3]))).toBeFalsy();
    expect(isDataView(new Int8Array([1, 2, 3]))).toBeFalsy();
    expect(isDataView(new Float32Array([1, 2, 3]))).toBeFalsy();
    expect(isDataView(new Uint8Array([1, 2, 3]))).toBeFalsy();
    expect(isDataView(new ArrayBuffer(8))).toBeFalsy();
    expect(isDataView("hello")).toBeFalsy();
    expect(isDataView(42)).toBeFalsy();
    expect(isDataView(true)).toBeFalsy();
    expect(isDataView({})).toBeFalsy();
    expect(isDataView([])).toBeFalsy();
    expect(isDataView(undefined)).toBeFalsy();
    expect(isDataView(null)).toBeFalsy();
    const customObject = { buffer: new ArrayBuffer(8) };
    expect(isDataView(customObject as any)).toBeFalsy();
  });
});
