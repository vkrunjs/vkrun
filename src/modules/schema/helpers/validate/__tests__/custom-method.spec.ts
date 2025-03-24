import { schema } from "../../../../../index";

describe("Schema Custom Method", () => {
  it("should succeed with custom synchronous validation", () => {
    const schemaCustom = schema()
      .string()
      .custom((ctx) => {
        if (ctx.value === "success") {
          ctx.success("ok");
        } else {
          ctx.failed("any message error");
        }
      });

    const sut = schemaCustom.test("success");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.value).toEqual("ok");
  });

  it("should fail with custom synchronous validation", () => {
    const schemaCustom = schema()
      .string()
      .custom((context) => {
        if (context.value === "success") {
          context.success("ok");
        } else {
          context.failed("any message error");
        }
      });

    const sut = schemaCustom.test("failed");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.value).toEqual("failed");
  });

  it("should fail with custom error", () => {
    const schemaCustom = schema()
      .string()
      .custom(() => {
        throw new Error("Custom Error");
      });

    const sut = schemaCustom.test("failed");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.errors[0].message).toEqual("Custom Error");
  });

  it("should succeed with custom validation and parse conversion (string -> number)", () => {
    const schemaCustom = schema()
      .string()
      .custom<number>((context) => {
        if (context.value === "success") {
          context.success(123);
        } else {
          context.failed("any message error");
        }
      });

    const sut = schemaCustom.test("success");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.value).toEqual(123);
  });

  it("should succeed with custom asynchronous validation", async () => {
    const schemaCustom = schema()
      .string()
      .custom(async (context) => {
        await new Promise((resolve) => {
          setTimeout(() => {
            if (context.value === "success") {
              context.success("ok");
            } else {
              context.failed("any message error");
            }
            resolve(null);
          }, 1);
        });
      });

    const sut = await schemaCustom.testAsync("success");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.value).toEqual("ok");
  });
});
