import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Min BigInt Method", () => {
  it("Should be able to validate the min method and return true if the value is greater than or equal to the reference", () => {
    expect(schema().bigInt().min({ min: 5n }).validate(5n)).toBeTruthy();
    expect(schema().bigInt().min({ min: 1n }).max({ max: 5n }).validate(5n)).toBeTruthy();
    expect(schema().bigInt().negative().max({ max: -1n }).validate(-5n)).toBeTruthy();
    expect(schema().bigInt().negative().min({ min: -5n }).max({ max: -1n }).validate(-5n)).toBeTruthy();
    expect(schema().bigInt().positive().max({ max: 5n }).validate(5n)).toBeTruthy();
    expect(schema().bigInt().positive().min({ min: 1n }).max({ max: 5n }).validate(5n)).toBeTruthy();
  });

  it("Should be able to validate the min method and return false if list is invalid", () => {
    const invalidList: any[] = [5.5, 6n, "1", false, new Date(), null, [], {}, undefined];

    const sut = schema().bigInt().min({ min: 7n });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the min method when value is promise and return true if the value is greater than or equal to the reference", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().min({ min: 1n }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the min method when value is promise and return false if the value is greater than to the reference", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().min({ min: 5n }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the min method and passedAll to equal true if the value is value greater than or equal to the reference", () => {
    const value = 1n;

    const sut = schema().bigInt().min({ min: 1n }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1n,
      },
      {
        method: "bigInt",
        name: "value_name",
        expect: "bigint type",
        received: 1n,
      },
      {
        method: "min",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: 1n,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal false if the value is greater than to the reference", () => {
    const value = 4n;

    const sut = schema().bigInt().min({ min: 5n }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 4n,
      },
      {
        method: "bigInt",
        name: "value_name",
        expect: "bigint type",
        received: 4n,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: 4n,
        message: "value_name must be greater than or equal to 5n!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const value = 4n;

    const sut = schema().bigInt().min({ min: 5n, message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 4n,
      },
      {
        method: "bigInt",
        name: "value_name",
        expect: "bigint type",
        received: 4n,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: 4n,
        message: "value_name 4n!",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min and passAll method as equal to true when it is not required", () => {
    const value = undefined;

    const sut = schema().bigInt().min({ min: 5n }).notRequired().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(1);
    expect(sut.successes).toEqual([
      {
        method: "notRequired",
        name: "value_name",
        expect: "value is not required and of any type",
        received: "undefined",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min and passAll method as equal to true when it is nullable", () => {
    const value = null;

    const sut = schema().bigInt().min({ min: 5n }).nullable().test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(1);
    expect(sut.successes).toEqual([
      {
        method: "nullable",
        name: "value_name",
        expect: "the value can be null, but other than undefined",
        received: null,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal true if the value is promise with a smaller bigint than the reference", async () => {
    const value = async (): Promise<bigint> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1n);
        }, 100);
      });
    };

    const sut = await schema().bigInt().min({ min: 1n }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: 1n,
      },
      {
        method: "bigInt",
        expect: "bigint type",
        name: "value_name",
        received: 1n,
      },
      {
        method: "min",
        expect: "value greater than or equal to the reference",
        name: "value_name",
        received: 1n,
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(1n);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal false if the value is a promise and is not bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().bigInt().min({ min: 5n }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(1);
    expect(sut.failed).toEqual(2);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: false,
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "bigInt",
        type: "invalid value",
        name: "value_name",
        expect: "bigint type",
        received: false,
        message: "value_name must be a bigint type!",
      },
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "value greater than or equal to the reference",
        received: false,
        message: "value_name must be greater than or equal to 5n!",
      },
    ]);
    expect(sut.value).toEqual(false);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and throw AnyError if the value is not bigint", () => {
    const value: any = undefined;

    const sut = (): void => schema().bigInt().min({ min: 5n }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the min method and throw Error if the value is a promise and is not bigint", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("1");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().bigInt().min({ min: 5n }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value_name must be a bigint type!");
  });
});
