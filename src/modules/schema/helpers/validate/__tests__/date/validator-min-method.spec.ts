import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Min Date Method", () => {
  it("Should not modify base schema when creating derived schema with min", () => {
    const baseDateSchema = schema()
      .date()
      .min({ min: new Date("2000-02-03T02:00:00.000Z") });

    const derivedNullableSchema = baseDateSchema.nullable();
    const derivedNotRequiredNullableSchema = derivedNullableSchema.notRequired();

    const validDate = new Date("2000-02-04T02:00:00.000Z");

    // --- Base schema ---
    expect(baseDateSchema.validate(validDate)).toBeTruthy();
    expect(baseDateSchema.validate(null)).toBeFalsy();
    expect(baseDateSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with nullable ---
    expect(derivedNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNullableSchema.validate(validDate)).toBeTruthy();
    expect(derivedNullableSchema.validate(undefined)).toBeFalsy();

    // --- Derived schema with nullable + notRequired ---
    expect(derivedNotRequiredNullableSchema.validate(null)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(undefined)).toBeTruthy();
    expect(derivedNotRequiredNullableSchema.validate(validDate)).toBeTruthy();

    // --- Base schema remains unmodified ---
    expect(baseDateSchema.validate(null)).toBeFalsy();
    expect(baseDateSchema.validate(undefined)).toBeFalsy();
  });

  it("Should be able to validate the min method and return true if the date is greater than the reference date", () => {
    const date = new Date("2000-02-04T02:00:00.000Z");
    const refDate = new Date("2000-02-03T02:00:00.000Z");

    const sut = schema().date().min({ min: refDate });

    expect(sut.validate(date)).toBeTruthy();
  });

  it("Should be able to validate the min method and return false if list is invalid", () => {
    const date = new Date("2000-02-02T02:00:00.000Z");

    const invalidList = [new Date("2000-02-03T02:00:00.000Z"), new Date("2000-02-04T02:00:00.000Z")];

    const dateSchema = schema().date();

    expect(invalidList.every((sut) => dateSchema.min({ min: sut }).validate(date))).toBeFalsy();
  });

  it("Should be able to validate the min method when value is promise and return true if the date is greater than the reference date", async () => {
    const refDate = new Date("2000-02-02T02:00:00.000Z");
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2000-02-03T02:00:00.000Z"));
        }, 100);
      });
    };

    const sut = await schema().date().min({ min: refDate }).validateAsync(date());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the min method when the value is a promise and return true if the date is less than the reference date", async () => {
    const refDate = new Date("2000-02-03T02:00:00.000Z");
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2000-02-02T02:00:00.000Z"));
        }, 100);
      });
    };

    const sut = await schema().date().min({ min: refDate }).validateAsync(date());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the min method and passedAll to equal true if the date is greater than the reference date", () => {
    const date = new Date("2000-02-03T02:00:00.000Z");
    const refDate = new Date("2000-02-02T02:00:00.000Z");

    const sut = schema().date().min({ min: refDate }).test(date, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
      {
        method: "min",
        name: "value_name",
        expect: "2000/02/03 02:00:00.000 greater than or equal to 2000/02/02 02:00:00.000",
        received: new Date("2000-02-03T02:00:00.000Z"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(date);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal false if the date is less than the reference date", () => {
    const date = new Date("2000-02-02T02:00:00.000Z");
    const refDate = new Date("2000-02-03T02:00:00.000Z");

    const sut = schema().date().min({ min: refDate }).test(date, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-02-02T02:00:00.000Z"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2000-02-02T02:00:00.000Z"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "2000/02/02 02:00:00.000 greater than or equal to 2000/02/03 02:00:00.000",
        received: new Date("2000-02-02T02:00:00.000Z"),
        message: "the value_name 2000/02/02 02:00:00.000 must be greater than or equal to the 2000/02/03 02:00:00.000!",
      },
    ]);
    expect(sut.value).toEqual(date);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min and passAll method as equal to true when it is not required and value is undefined", () => {
    const date = undefined;
    const refDate = new Date("2000-02-02T02:00:00.000Z");

    const sut = schema().date().min({ min: refDate }).notRequired().test(date, "value_name");

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
    expect(sut.value).toEqual(date);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min and passAll method as equal to false if value is undefined", () => {
    const date: any = undefined;
    const refDate = new Date("2000-02-02T02:00:00.000Z");

    const sut = schema().date().min({ min: refDate }).test(date, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(0);
    expect(sut.failed).toEqual(2);
    expect(sut.totalTests).toEqual(2);
    expect(sut.successes).toEqual([]);
    expect(sut.errors).toEqual([
      {
        method: "required",
        type: "missing value",
        name: "value_name",
        expect: "value other than undefined",
        received: "undefined",
        message: "value_name is required!",
      },
      {
        method: "date",
        type: "invalid value",
        name: "value_name",
        expect: "Date type",
        received: "undefined",
        message: "value_name must be a Date type!",
      },
    ]);
    expect(sut.value).toEqual(date);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal true if value is promise and greater than the reference date", async () => {
    const refDate = new Date("2000-03-02T02:00:00.000Z");
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2000-03-02T02:00:00.001Z"));
        }, 100);
      });
    };

    const sut = await schema().date().min({ min: refDate }).testAsync(date(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-03-02T02:00:00.001Z"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2000-03-02T02:00:00.001Z"),
      },
      {
        method: "min",
        name: "value_name",
        expect: "2000/03/02 02:00:00.001 greater than or equal to 2000/03/02 02:00:00.000",
        received: new Date("2000-03-02T02:00:00.001Z"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(new Date("2000-03-02T02:00:00.001Z"));
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and passedAll to equal false if value is promise and less than the reference date", async () => {
    const refDate = new Date("2000-03-02T02:00:00.001Z");
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2000-03-02T02:00:00.000Z"));
        }, 100);
      });
    };

    const sut = await schema().date().min({ min: refDate }).testAsync(date(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-03-02T02:00:00.000Z"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2000-03-02T02:00:00.000Z"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "2000/03/02 02:00:00.000 greater than or equal to 2000/03/02 02:00:00.001",
        received: new Date("2000-03-02T02:00:00.000Z"),
        message: "the value_name 2000/03/02 02:00:00.000 must be greater than or equal to the 2000/03/02 02:00:00.001!",
      },
    ]);
    expect(sut.value).toEqual(new Date("2000-03-02T02:00:00.000Z"));
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const refDate = new Date("2000-03-02T02:00:00.001Z");
    const value = new Date("2000-03-02T02:00:00.000Z");

    const sut = schema().date().min({ min: refDate, message: "[valueName] [value] any message" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2000-03-02T02:00:00.000Z"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2000-03-02T02:00:00.000Z"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "min",
        type: "invalid value",
        name: "value_name",
        expect: "2000/03/02 02:00:00.000 greater than or equal to 2000/03/02 02:00:00.001",
        received: new Date("2000-03-02T02:00:00.000Z"),
        message: "value_name 2000/03/02 02:00:00.000 any message",
      },
    ]);
    expect(sut.value).toEqual(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the min method and throw AnyError if the value is undefined", () => {
    const date: any = undefined;
    const refDate = new Date("2000-03-02T02:00:00.000Z");

    const sut = (): void => schema().date().min({ min: refDate }).throw(date, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the min method and throw Error if the value is a promise and less than the reference date", async () => {
    const refDate = new Date("2000-03-02T02:00:00.001Z");
    const date = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2000-03-02T02:00:00.000Z"));
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().date().min({ min: refDate }).throwAsync(date(), "value_name");

    await expect(sut).rejects.toThrow(
      "the value_name 2000/03/02 02:00:00.000 must be greater than or equal to the 2000/03/02 02:00:00.001!",
    );
  });
});
