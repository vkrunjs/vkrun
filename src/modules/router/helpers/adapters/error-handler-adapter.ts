import { ErrorHandlerMiddleware, Request, Response } from "../../../types";

export const errorHandleAdapter = (middleware: ErrorHandlerMiddleware) => {
  return (error: any, request: Request, response: Response) => {
    middleware.handle(error, request, response);
  };
};
