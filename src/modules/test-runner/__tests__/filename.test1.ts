import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, spyOn, mockFn } from "..";

// Teste básico de soma
describe("Math Tests", () => {
  it("should add two numbers correctly", () => {
    expect(2 + 2).toEqual(4);
  });

  it("should fail when values are incorrect", () => {
    expect(2 + 2).toEqual(5); // Esse teste deve falhar
  });
});

// Testando Hooks
describe("Lifecycle Hooks", () => {
  let counter = 0;

  beforeAll(() => {
    console.log("🏁 Running beforeAll");
    counter = 100;
  });

  beforeEach(() => {
    console.log("🔹 Running beforeEach");
    counter += 1;
  });

  afterEach(() => {
    console.log("🔹 Running afterEach");
    counter -= 1;
  });

  afterAll(() => {
    console.log("🏁 Running afterAll");
  });

  it("should have incremented counter", () => {
    expect(counter).toEqual(101);
  });

  it("should maintain counter state between tests", () => {
    expect(counter).toEqual(101);
  });
});

// Testando Spies
describe("Spy Tests", () => {
  const obj = {
    sayHello: (name: string) => `Hello, ${name}!`,
  };

  it("should spy on method calls", () => {
    const spy = spyOn(obj, "sayHello");

    obj.sayHello("Alice");
    obj.sayHello("Bob");

    spy.toHaveBeenCalled();
    spy.toHaveBeenCalledWith("Alice");
    spy.toHaveBeenCalledWith("Bob");

    spy.restore();
  });
});

// Testando Mock Functions
describe("Mock Function Tests", () => {
  it("should use a mocked function", () => {
    const fakeFn = mockFn();
    fakeFn.mockReturnValue("Fake Response");

    const result = fakeFn();
    expect(result).toEqual("Fake Response");

    fakeFn();
    fakeFn();
    fakeFn();

    expect(fakeFn.toHaveBeenCalled()).toBeTruthy();
  });
});

// Testando Snapshot
describe("Snapshot Testing", () => {
  it("should match complex snapshot", () => {
    const data = {
      id: 123,
      user: {
        name: "Alice",
        age: 30,
        email: "alice@example.com",
      },
      active: true,
    };

    expect(data).toMatchSnapshot();
  });
});

// Testando Código Assíncrono
describe("Async Tests", () => {
  it("should resolve after 1 second", async () => {
    const asyncFunction = async () => {
      return new Promise((resolve) => setTimeout(() => resolve("Done!"), 4000));
    };

    const result = await asyncFunction();
    expect(result).toEqual("Done!");
  });

  it("should fail if async function returns wrong value", async () => {
    const asyncFunction = async () => {
      return new Promise((resolve) => setTimeout(() => resolve("Wrong!"), 3000));
    };

    const result = await asyncFunction();
    expect(result).toEqual("Expected!"); // Esse teste deve falhar
  });

  it("should handle rejected promises", async () => {
    const asyncFunction = async () => {
      return new Promise((_, reject) => setTimeout(() => reject(new Error("Async Error")), 2000));
    };

    try {
      await asyncFunction();
      throw new Error("Test should have failed");
    } catch (error: any) {
      expect(error.message).toEqual("Async Error");
    }
  });
});

// Testando Hooks Assíncronos
describe("Async Hooks Tests", () => {
  let value = 0;

  beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    value = 10;
  });

  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    value += 5;
  });

  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    value -= 5;
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    value = 0;
  });

  it("should correctly use async beforeEach", async () => {
    expect(value).toEqual(15);
  });

  it("should maintain async state between tests", async () => {
    expect(value).toEqual(15);
  });
});

// Testando toBe (comparação por referência)
describe("toBe Tests", () => {
  it("should pass when comparing the same reference", () => {
    const obj = { a: 1 };
    expect(obj).toBe(obj); // Mesmo objeto na memória
  });

  it("should fail when comparing different objects with same values", () => {
    expect({ a: 1 }).toBe({ a: 1 }); // Objetos diferentes na memória
  });

  it("should pass when comparing primitive values", () => {
    expect(42).toBe(42);
    expect("hello").toBe("hello");
    expect(true).toBe(true);
  });

  it("should fail when comparing different primitive values", () => {
    expect(42).toBe(24);
    expect("hello").toBe("world");
    expect(true).toBe(false);
  });
});
