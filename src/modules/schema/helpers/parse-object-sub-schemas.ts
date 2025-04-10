import { SchemaMethod } from "../../../index";

export const parseObjectSubSchemas = (
  params: {
    currentValue: any;
  },
  blockMethods: SchemaMethod[],
): void => {
  const objMethod = blockMethods.find((m) => m.method === "object");
  if (!objMethod?.schema) return;

  for (const [key, sub] of Object.entries(objMethod.schema)) {
    if (typeof sub.test === "function") {
      const subResult = sub.test(params.currentValue[key], key);
      if (subResult.passedAll) {
        params.currentValue[key] = subResult.value;
      }
    }
  }
};
