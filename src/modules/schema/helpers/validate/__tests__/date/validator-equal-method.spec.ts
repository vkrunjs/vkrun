import { schema } from "../../../../index";
import { AnyError } from "../../../../../errors";

describe("Validator Date Equal Method", () => {
  it("Should be able to validate the equal method and return true if the value is equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = valueToCompare;

    const sut = schema().date().equal(valueToCompare).validate(value);

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method and return false if the value is not equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date();

    const sut = schema().date().equal(valueToCompare).validate(value);

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method when value is promise and return true if the value is equal to the comparison value", async () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(valueToCompare);
        }, 100);
      });
    };

    const sut = await schema().date().equal(valueToCompare).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the equal method when value is promise and return false if the value is not equal to the comparison value", async () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("hello");
        }, 100);
      });
    };

    const sut = await schema().date().equal(valueToCompare).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the equal method and passedAll to equal true if the value is equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = valueToCompare;

    const sut = schema().date().equal(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
      {
        method: "equal",
        name: "value_name",
        expect: new Date("2020-01-01T00:00:00+02:00"),
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should allow custom error message", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date("2020-02-01T00:00:00+02:00");

    const sut = schema().date().equal(valueToCompare, { message: "[valueName] [value]!" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2020-02-01T00:00:00+02:00"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2020-02-01T00:00:00+02:00"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: new Date("2020-01-01T00:00:00+02:00"),
        received: new Date("2020-02-01T00:00:00+02:00"),
        message: "value_name Fri Jan 31 2020 19:00:00 GMT-0300 (Horário Padrão de Brasília)!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is not equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value = new Date("2020-02-01T00:00:00+02:00");

    const sut = schema().date().equal(valueToCompare).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2020-02-01T00:00:00+02:00"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2020-02-01T00:00:00+02:00"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: new Date("2020-01-01T00:00:00+02:00"),
        received: new Date("2020-02-01T00:00:00+02:00"),
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal and passAll method as equal to true when it is not required and the value is undefined", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value: any = undefined;

    const sut = schema().date().equal(valueToCompare).notRequired().test(value, "value_name");

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
    expect(sut.value).toBe(value);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal true if the value is promise and equal to the comparison value", async () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2020-01-01T00:00:00+02:00"));
        }, 100);
      });
    };

    const sut = await schema().date().equal(valueToCompare).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
      {
        method: "equal",
        name: "value_name",
        expect: new Date("2020-01-01T00:00:00+02:00"),
        received: new Date("2020-01-01T00:00:00+02:00"),
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(sut.value).toEqual(new Date("2020-01-01T00:00:00+02:00"));
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and passedAll to equal false if the value is a promise and is not equal to the comparison value", async () => {
    const valueToCompare: any = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date("2020-02-01T00:00:00+02:00"));
        }, 100);
      });
    };

    const sut = await schema().date().equal(valueToCompare).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: new Date("2020-02-01T00:00:00+02:00"),
      },
      {
        method: "date",
        name: "value_name",
        expect: "Date type",
        received: new Date("2020-02-01T00:00:00+02:00"),
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "equal",
        type: "invalid value",
        name: "value_name",
        expect: new Date("2020-01-01T00:00:00+02:00"),
        received: new Date("2020-02-01T00:00:00+02:00"),
        message: "value does not match!",
      },
    ]);
    expect(sut.value).toEqual(new Date("2020-02-01T00:00:00+02:00"));
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the equal method and throw AnyError if the value is not equal to the comparison value", () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");
    const value: any = undefined;

    const sut = (): void => schema().date().equal(valueToCompare).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the equal method and throw Error if the value is a promise and is not of type boolean", async () => {
    const valueToCompare = new Date("2020-01-01T00:00:00+02:00");

    const value = async (): Promise<Date> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Date());
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().date().equal(valueToCompare).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("value does not match!");
  });
});
