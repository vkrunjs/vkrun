import { SchemaMethods, SchemaMethodTypes } from "../../types";

export const hasMethod = (methods: SchemaMethods, method: SchemaMethodTypes): boolean => {
  if (!methods) return false;
  return methods.some((rule: any) => rule.method === method);
};
