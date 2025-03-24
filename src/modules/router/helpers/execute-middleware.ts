import { Request, Response } from "../../types";

export const executeMiddleware = async (
  middleware: any,
  request: Request,
  response: Response,
  nextMiddleware: () => Promise<void> | void,
): Promise<void> => {
  if (typeof middleware.handle === "function" && middleware.handle.length === 3) {
    await middleware.handle(request, response, nextMiddleware);
  } else if (typeof middleware === "function" && middleware.length === 3) {
    await middleware(request, response, nextMiddleware);
  } else {
    throw new Error("vkrun-router: method use received invalid middleware.");
  }
};
