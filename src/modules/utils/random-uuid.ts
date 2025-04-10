import { randomUUID as _randomUUID } from "../runtime";

export const randomUUID = (): string => {
  return _randomUUID();
};
