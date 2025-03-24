import { describe, expect, it } from "../../../../../..";

describe("Expect resolves.not.toBe Method - Success Cases", () => {
  it("should pass when the promise resolves to a different number", async () => {
    await expect(Promise.resolve(42)).resolves.not.toBe(43);
  });

  it("should pass when the resolved string is different", async () => {
    await expect(Promise.resolve("hello")).resolves.not.toBe("world");
  });

  it("should pass when the resolved boolean is different", async () => {
    await expect(Promise.resolve(true)).resolves.not.toBe(false);
  });

  it("should pass when the resolved object is a different reference", async () => {
    await expect(Promise.resolve({ a: 1 })).resolves.not.toBe({ a: 1 });
  });

  it("should pass when the resolved array is a different reference", async () => {
    await expect(Promise.resolve([1, 2, 3])).resolves.not.toBe([1, 2, 3]);
  });

  it("should pass when the resolved date is a different reference", async () => {
    await expect(Promise.resolve(new Date(2023, 1, 1))).resolves.not.toBe(new Date(2023, 1, 1));
  });

  it("should pass when the resolved buffer is a different reference", async () => {
    await expect(Promise.resolve(Buffer.from("hello"))).resolves.not.toBe(Buffer.from("hello"));
  });

  it("should pass when the resolved symbol is a different reference", async () => {
    await expect(Promise.resolve(Symbol("example"))).resolves.not.toBe(Symbol("example"));
  });

  it("should pass when the resolved Map is a different reference", async () => {
    const map1 = new Map();
    map1.set("key1", "value1");

    const map2 = new Map();
    map2.set("key1", "value1");

    await expect(Promise.resolve(map1)).resolves.not.toBe(map2);
  });

  it("should pass when the resolved WeakMap is a different reference", async () => {
    const weakMap1 = new WeakMap();
    const obj1 = { key: "content" };
    weakMap1.set(obj1, "value");

    const weakMap2 = new WeakMap();
    const obj2 = { key: "content" };
    weakMap2.set(obj2, "value");

    await expect(Promise.resolve(weakMap1)).resolves.not.toBe(weakMap2);
  });

  it("should pass when the resolved WeakSet is a different reference", async () => {
    const weakSet1 = new WeakSet();
    const obj1 = { key: "content" };
    weakSet1.add(obj1);

    const weakSet2 = new WeakSet();
    const obj2 = { key: "content" };
    weakSet2.add(obj2);

    await expect(Promise.resolve(weakSet1)).resolves.not.toBe(weakSet2);
  });

  it("should pass when the resolved ArrayBuffer is a different reference", async () => {
    await expect(Promise.resolve(new ArrayBuffer(8))).resolves.not.toBe(new ArrayBuffer(8));
  });

  it("should pass when the resolved BigInt is a different value", async () => {
    await expect(Promise.resolve(BigInt(123))).resolves.not.toBe(BigInt(456));
  });

  it("should pass when the promise resolves to a different value after a delay", async () => {
    const fetchData = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 5);
      });
    };
    await expect(fetchData()).resolves.not.toBe(true);
  });
});
