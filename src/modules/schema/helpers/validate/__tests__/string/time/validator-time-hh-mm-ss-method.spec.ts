import { schema } from "../../../../../index";
import { AnyError } from "../../../../../../errors";

describe("Validator Time HH:MM:SS Method", () => {
  it("Should be able to validate the time method and return true if list is valid", () => {
    const setList = new Set();
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute <= 59; minute++) {
        for (let second = 0; second <= 59; second++) {
          setList.add(
            `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`,
          );
        }
      }
    }

    const completeListOfHoursAndMinutes: any[] = Array.from(setList);

    const sut = schema().string().time({ type: "HH:MM:SS" });

    expect(completeListOfHoursAndMinutes.every((value) => sut.validate(value))).toBeTruthy();
  });

  it("Should be able to validate the time method and return false if list is invalid", () => {
    const invalidList: any[] = ["24:00:60", "24:00", "00:60", "invalid-value", false, new Date(), 123, null, [], {}, undefined];

    const sut = schema().string().time({ type: "HH:MM:SS" });

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy();
  });

  it("Should be able to validate the time method when value is promise and return true if the value is a valid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("13:51:59");
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM:SS" }).validateAsync(value());

    expect(sut).toBeTruthy();
  });

  it("Should be able to validate the time method when value is promise and return false if the value is a invalid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("13:51:5");
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM:SS" }).validateAsync(value());

    expect(sut).toBeFalsy();
  });

  it("Should be able to validate the time method and passedAll to equal true if the value is a valid time format", () => {
    const value = "13:51:59";

    const sut = schema().string().time({ type: "HH:MM:SS" }).test(value, "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "13:51:59",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "13:51:59",
      },
      {
        method: "time",
        name: "value_name",
        expect: "HH:MM:SS format",
        received: "13:51:59",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and passedAll to equal false if the value is a invalid time format", () => {
    const value = "13:51:6";

    const sut = schema().string().time({ type: "HH:MM:SS" }).test(value, "value_name");

    expect(sut.passedAll).toBeFalsy();
    expect(sut.passed).toEqual(2);
    expect(sut.failed).toEqual(1);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "13:51:6",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "13:51:6",
      },
    ]);
    expect(sut.errors).toEqual([
      {
        method: "time",
        type: "invalid value",
        name: "value_name",
        expect: "HH:MM:SS format",
        received: "13:51:6",
        message: "the time 13:51:6 is not in the format HH:MM:SS!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time and passAll method as equal to true when it is not required and value is undefined", () => {
    const value = undefined;

    const sut = schema().string().time({ type: "HH:MM:SS" }).notRequired().test(value, "value_name");

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
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and passedAll to equal true if value is promise in valid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("23:59:59");
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM:SS" }).testAsync(value(), "value_name");

    expect(sut.passedAll).toBeTruthy();
    expect(sut.passed).toEqual(3);
    expect(sut.failed).toEqual(0);
    expect(sut.totalTests).toEqual(3);
    expect(sut.successes).toEqual([
      {
        method: "required",
        name: "value_name",
        expect: "value other than undefined",
        received: "23:59:59",
      },
      {
        method: "string",
        name: "value_name",
        expect: "string type",
        received: "23:59:59",
      },
      {
        method: "time",
        name: "value_name",
        expect: "HH:MM:SS format",
        received: "23:59:59",
      },
    ]);
    expect(sut.errors).toEqual([]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and passedAll to equal false if value is promise in invalid time format", async () => {
    const value = async (): Promise<any> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    };

    const sut = await schema().string().time({ type: "HH:MM:SS" }).testAsync(value(), "value_name");

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
        method: "string",
        type: "invalid value",
        name: "value_name",
        expect: "string type",
        received: false,
        message: "value_name must be a string type!",
      },
      {
        method: "time",
        type: "invalid value",
        name: "value_name",
        expect: "HH:MM:SS format",
        received: false,
        message: "the time false is not in the format HH:MM:SS!",
      },
    ]);
    expect(typeof sut.time === "string").toBeTruthy();
  });

  it("Should be able to validate the time method and throw AnyError if the value is a valid time format", () => {
    const value: any = undefined;

    const sut = (): void => schema().string().time({ type: "HH:MM:SS" }).throw(value, "value_name", AnyError);

    expect(sut).toThrow(AnyError);
    expect(sut).toThrow(new AnyError("value_name is required!"));
  });

  it("Should be able to validate the time method and throw Error if the value is a promise and is a invalid time format", async () => {
    const value = async (): Promise<string> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("23:60");
        }, 100);
      });
    };

    const sut = async (): Promise<void> => await schema().string().time({ type: "HH:MM:SS" }).throwAsync(value(), "value_name");

    await expect(sut).rejects.toThrow("the time 23:60 is not in the format HH:MM:SS!");
  });
});
