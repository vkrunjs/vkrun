import * as type from "../types";

export const validateRouteData = (schema: any, onError?: (error: string, response: type.Response) => Promise<void>) => {
  return async (request: type.Request, response: type.Response, next: type.NextFunction) => {
    try {
      const routeData = {
        headers: request.headers,
        params: request.params,
        query: request.query,
        files: request.files,
        body: request.body,
        session: request.session,
      };

      const parsedValue: any = await schema.parseAsync(routeData);

      if (parsedValue?.headers !== undefined) {
        for (const key in parsedValue.headers) {
          if (Object.prototype.hasOwnProperty.call(parsedValue.headers, key)) {
            request.headers[key] = parsedValue.headers[key]; // Substitui os valores de request.headers com os validados
          }
        }
      }

      if (parsedValue?.params !== undefined) request.params = parsedValue.params;
      if (parsedValue?.query !== undefined) request.query = parsedValue.query;
      if (parsedValue?.files !== undefined) request.files = parsedValue.files;
      if (parsedValue?.body !== undefined) request.body = parsedValue.body;
      if (parsedValue?.session !== undefined) request.session = parsedValue.session;

      next();
    } catch (error: any) {
      if (onError) {
        await onError(error?.message ?? "", response);
      } else {
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("Content-Security-Policy", "default-src 'self'");
        response.setHeader("X-XSS-Protection", "1; mode=block");
        response.statusCode = 400;
        response.end(error?.message);
      }
    }
  };
};
