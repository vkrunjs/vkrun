import { isFunction, isPromise } from "../../../utils";
import { getFilename } from "../get-filename";
import {
  matchers,
  errorDetailsToBe,
  errorDetailsToEqual,
  errorDetailsToTruthy,
  errorDetailsToFalsy,
  errorDetailsToThrow,
} from "./helpers";

export class Expect {
  constructor(
    private received: any,
    private testFilePath: string,
  ) {}

  toBe(expected: any): void {
    const pass = matchers["toBe"](expected, this.received);
    if (!pass) {
      throw new Error(
        errorDetailsToBe({
          expected,
          received: this.received,
          filename: getFilename(new Error()),
        }),
      );
    }

    // throw new Error("passed");
  }

  toEqual(expected: any): void {
    const pass = matchers["toEqual"](expected, this.received);
    if (!pass) {
      throw new Error(
        errorDetailsToEqual({
          expected,
          received: this.received,
          filename: getFilename(new Error()),
        }),
      );
    }

    // throw new Error("passed");
  }

  toBeTruthy(): void {
    const pass = matchers["toBeTruthy"](this.received);
    if (!pass) {
      throw new Error(
        errorDetailsToTruthy({
          received: this.received,
          filename: getFilename(new Error()),
        }),
      );
    }

    // throw new Error("passed");
  }

  toBeFalsy(): void {
    const pass = matchers["toBeFalsy"](this.received);
    if (!pass) {
      throw new Error(
        errorDetailsToFalsy({
          received: this.received,
          filename: getFilename(new Error()),
        }),
      );
    }

    // throw new Error("passed");
  }

  toThrow(expected?: any): void {
    const pass = matchers["toThrow"](expected, this.received);
    if (!pass) {
      throw new Error(
        errorDetailsToThrow({
          expected,
          received: this.received,
          filename: getFilename(new Error()),
        }),
      );
    }

    // throw new Error("passed");
  }

  resolves = {
    toBe: async (expected: any): Promise<void> => {
      let received = this.received;
      let receivedReject = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      }

      if (receivedReject) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toBe"](expected, received);
      if (!pass) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toEqual: async (expected: any): Promise<void> => {
      let received = this.received;
      let receivedReject = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      }

      if (receivedReject) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toEqual"](expected, received);
      if (!pass) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toBeFalsy: async (): Promise<void> => {
      let received = this.received;
      let receivedReject = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToFalsy({
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      }

      if (receivedReject) {
        throw new Error(
          errorDetailsToFalsy({
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toBeFalsy"](received);
      if (!pass) {
        throw new Error(
          errorDetailsToFalsy({
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toBeTruthy: async (): Promise<void> => {
      let received = this.received;
      let receivedReject = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToTruthy({
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
          })
          .catch((reject: any) => {
            received = reject;
            receivedReject = true;
          });
      }

      if (receivedReject) {
        throw new Error(
          errorDetailsToTruthy({
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toBeTruthy"](received);
      if (!pass) {
        throw new Error(
          errorDetailsToTruthy({
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    not: {
      toBe: async (expected: any): Promise<void> => {
        let received = this.received;
        let receivedReject = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToBe({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        }

        if (receivedReject) {
          throw new Error(
            errorDetailsToBe({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toBe"](expected, received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToBe({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },

      toEqual: async (expected: any): Promise<void> => {
        let received = this.received;
        let receivedReject = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToEqual({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        }

        if (receivedReject) {
          throw new Error(
            errorDetailsToEqual({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toEqual"](expected, received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToEqual({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },

      toBeFalsy: async (): Promise<void> => {
        let received = this.received;
        let receivedReject = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToFalsy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        }

        if (receivedReject) {
          throw new Error(
            errorDetailsToFalsy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toBeFalsy"](received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToFalsy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },

      toBeTruthy: async (): Promise<void> => {
        let received = this.received;
        let receivedReject = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToTruthy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
            })
            .catch((reject: any) => {
              received = reject;
              receivedReject = true;
            });
        }

        if (receivedReject) {
          throw new Error(
            errorDetailsToTruthy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toBeTruthy"](received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToTruthy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },
    },
  };

  rejects = {
    toBe: async (expected: any): Promise<void> => {
      let received: any = this.received;
      let receivedResolve = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      }

      if (receivedResolve) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toBe"](expected, received);
      if (!pass) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toEqual: async (expected: any): Promise<void> => {
      let received: any = this.received;
      let receivedResolve = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      }

      if (receivedResolve) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toEqual"](expected, received);
      if (!pass) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toBeFalsy: async (): Promise<void> => {
      let received: any = this.received;
      let receivedResolve = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToFalsy({
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      }

      if (receivedResolve) {
        throw new Error(
          errorDetailsToFalsy({
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toBeFalsy"](received);
      if (!pass) {
        throw new Error(
          errorDetailsToFalsy({
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toBeTruthy: async (): Promise<void> => {
      let received: any = this.received;
      let receivedResolve = false;
      let filename = getFilename(new Error(), 2);

      if (!isPromise(received)) {
        throw new Error(
          errorDetailsToTruthy({
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: false },
          }),
        );
      }

      if (isFunction(received)) {
        await received()
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      } else {
        await received
          .then((resolve: any) => {
            received = resolve;
            receivedResolve = true;
          })
          .catch((reject: any) => {
            received = reject;
          });
      }

      if (receivedResolve) {
        throw new Error(
          errorDetailsToTruthy({
            received,
            filename,
            flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true },
          }),
        );
      }

      const pass = matchers["toBeTruthy"](received);
      if (!pass) {
        throw new Error(
          errorDetailsToTruthy({
            received,
            filename,
            flags: { resolves: true, receivedIsPromise: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toThrow: async (expected: any): Promise<void> => {
      const received = await this.received;
      try {
        matchers["toThrow"](expected, received);
      } catch (error) {
        // throw createError(received, expected, getFilename(new Error()));
      }

      // throw new Error("passed");
    },

    not: {
      toBe: async (expected: any): Promise<void> => {
        let received: any = this.received;
        let receivedResolve = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToBe({
              expected,
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        }

        if (receivedResolve) {
          throw new Error(
            errorDetailsToBe({
              expected,
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toBe"](expected, received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToBe({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },

      toEqual: async (expected: any): Promise<void> => {
        let received: any = this.received;
        let receivedResolve = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToEqual({
              expected,
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        }

        if (receivedResolve) {
          throw new Error(
            errorDetailsToEqual({
              expected,
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toEqual"](expected, received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToEqual({
              expected,
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },

      toBeFalsy: async (): Promise<void> => {
        let received: any = this.received;
        let receivedResolve = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToFalsy({
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        }

        if (receivedResolve) {
          throw new Error(
            errorDetailsToFalsy({
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toBeFalsy"](received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToFalsy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },

      toBeTruthy: async (): Promise<void> => {
        let received: any = this.received;
        let receivedResolve = false;
        let filename = getFilename(new Error(), 2);

        if (!isPromise(received)) {
          throw new Error(
            errorDetailsToTruthy({
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: false, not: true },
            }),
          );
        }

        if (isFunction(received)) {
          await received()
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        } else {
          await received
            .then((resolve: any) => {
              received = resolve;
              receivedResolve = true;
            })
            .catch((reject: any) => {
              received = reject;
            });
        }

        if (receivedResolve) {
          throw new Error(
            errorDetailsToTruthy({
              received,
              filename,
              flags: { rejects: true, receivedIsPromise: true, invalidReceivedPromise: true, not: true },
            }),
          );
        }

        const pass = matchers["toBeTruthy"](received, { not: true });
        if (!pass) {
          throw new Error(
            errorDetailsToTruthy({
              received,
              filename,
              flags: { resolves: true, receivedIsPromise: true, not: true },
            }),
          );
        }

        // throw new Error("passed");
      },
    },
  };

  not = {
    toBe: (expected: any): void => {
      const pass = matchers["toBe"](expected, this.received, { not: true });
      if (!pass) {
        throw new Error(
          errorDetailsToBe({
            expected,
            received: this.received,
            filename: getFilename(new Error()),
            flags: { not: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toEqual: (expected: any): void => {
      const pass = matchers["toEqual"](expected, this.received, { not: true });
      if (!pass) {
        throw new Error(
          errorDetailsToEqual({
            expected,
            received: this.received,
            filename: getFilename(new Error()),
            flags: { not: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toBeTruthy: (): void => {
      const pass = matchers["toBeTruthy"](this.received, { not: true });
      if (!pass) {
        throw new Error(
          errorDetailsToTruthy({
            received: this.received,
            filename: getFilename(new Error()),
            flags: { not: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toBeFalsy: (): void => {
      const pass = matchers["toBeFalsy"](this.received, { not: true });
      if (!pass) {
        throw new Error(
          errorDetailsToFalsy({
            received: this.received,
            filename: getFilename(new Error()),
            flags: { not: true },
          }),
        );
      }

      // throw new Error("passed");
    },

    toThrow: (expected?: any): void => {
      const pass = matchers["toThrow"](expected, this.received, { not: true });
      if (!pass) {
        throw new Error(
          errorDetailsToThrow({
            expected,
            received: this.received,
            filename: getFilename(new Error()),
            flags: { not: true },
          }),
        );
      }

      // throw new Error("passed");
    },
  };
}
