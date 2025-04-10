import { Request, Response, NextFunction } from "../types";

/**
 * Middleware for validating request data using a schema.
 *
 * This middleware ensures that the request's headers, params, query, files, and body
 * comply with the specified validation schema. If validation fails, it either triggers
 * a custom error handler or returns a default `400 Bad Request` response.
 *
 * ---
 *
 * ### Behavior of `parseData()` and Why `params` and `query` Start as `string()`
 *
 * The `parseData()` function automatically converts some values **only in query parameters and route parameters (`params`)**,
 * since body values (`body`) follow JSON parsing rules.
 *
 * - **`parseData()` automatically converts:**
 *   - Strings in **ISO 8601 format** (`"2024-06-30T12:00:00.000Z"`) → Converted to **Date**.
 *   - Strings `"true"` and `"false"` → Converted to **Boolean** (`true | false`).
 *
 * - **Why Are Numbers in `query` and `params` Always Strings?**
 *   - Numbers in JSON **do not have leading zeros**, but numbers in `params` and `query` **can contain leading zeros** (e.g., `007`).
 *   - If `parseData()` automatically converted **all numbers**, it would remove the leading zeros.
 *   - **Solution:** All numbers are treated as `string()` by default, and **if conversion is needed**, `.parseTo().number()` or `.parseTo().bigInt()` should be used.
 *
 * ---
 *
 * @param {any} schema - The schema used to validate request data.
 * @param {(error: string, response: Response) => Promise<void>} [onError] - Optional custom error handler.
 *        If provided, this function will be called with the validation error message
 *        and response object instead of returning a default `400 Bad Request` response.
 *
 * @example
 * import { App, Request, Response, schema, validateRouteData } from "vkrun";
 *
 * const app = App();
 *
 * const schemaData = schema().object({
 *   headers: schema().object({
 *     authorization: schema().string().notRequired(),
 *   }),
 *   params: schema().object({
 *     string: schema().string().email(),
 *     integer: schema().string().parseTo().number().integer(), // Needed because numbers are treated as strings in params
 *   }),
 *   query: schema().object({
 *     float: schema().string().parseTo().number().float(), // Needed because numbers are treated as strings in query
 *     boolean: schema().boolean(), // No need to parse, `parseData()` automatically converts "true" / "false"
 *     date: schema().date(),
 *   }),
 *   body: schema().object({
 *     string: schema().string().email(),
 *     integer: schema().number().integer(), // JSON numbers remain numbers
 *     float: schema().number().float(), // JSON numbers remain numbers
 *     boolean: schema().boolean(),
 *     date: schema().date(),
 *   }),
 * });
 *
 * app.post("/params/:string/:integer/query",
 *   validateRouteData(schemaData),
 *   (request: Request, response: Response) => {
 *     response.status(200).json({
 *       headers: request.headers,
 *       query: request.query,
 *       params: request.params,
 *       body: request.body,
 *     });
 *   }
 * );
 *
 * app.server().listen(3000, () => {
 *   console.log("Server running on port 3000");
 * });
 *
 * @example
 * // Sending a valid request:
 * const response = await superRequest(app).post("/params/test@mail.com/007/query?float=1.5&boolean=true&date=2024-06-30T12:00:00.000Z", {
 *   string: "test@mail.com",
 *   integer: 7, // JSON numbers remain numbers
 *   float: 1.5,
 *   boolean: true,
 *   date: "2024-06-30T12:00:00.000Z"
 * }, {
 *   headers: {
 *     authorization: "Bearer token123"
 *   }
 * });
 *
 * console.log(response.statusCode); // 200
 *
 * @example
 * // Sending an invalid request (invalid email):
 * await superRequest(app)
 *   .post("/params/invalid-email/123/query?float=1.5&boolean=true&date=2024-06-30T12:00:00.000Z", {
 *     string: "invalid-email",
 *     integer: 123,
 *     float: 1.5,
 *     boolean: true,
 *     date: "2024-06-30T12:00:00.000Z"
 *   })
 *   .catch((error) => {
 *     console.log(error.response.statusCode); // 400
 *     console.log(error.response.data); // "email invalid-email is invalid!"
 *   });
 *
 * @example
 * // Using a custom error handler:
 * const customErrorHandler = async (error: string, response: Response) => {
 *   response.status(400).json({ message: `Custom Error: ${error}` });
 * };
 *
 * app.post("/params/:string/:integer/query",
 *   validateRouteData(schemaData, customErrorHandler),
 *   (request: Request, response: Response) => {
 *     response.status(200).json(request.body);
 *   }
 * );
 *
 * await superRequest(app)
 *   .post("/params/invalid-email/123/query?float=1.5&boolean=true&date=2024-06-30T12:00:00.000Z", {
 *     string: "invalid-email",
 *     integer: 123,
 *     float: 1.5,
 *     boolean: true,
 *     date: "2024-06-30T12:00:00.000Z"
 *   })
 *   .catch((error) => {
 *     console.log(error.response.statusCode); // 400
 *     console.log(error.response.data); // { message: "Custom Error: email invalid-email is invalid!" }
 *   });
 */
export const validateRouteData = (schema: any, onError?: (error: string, response: Response) => Promise<void>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const routeData = {
        headers: request.headers,
        params: request.params,
        query: request.query,
        files: request.files,
        body: request.body,
      };

      const parsedValue: any = await schema.parseAsync(routeData);

      if (parsedValue?.headers !== undefined) {
        for (const key in parsedValue.headers) {
          if (Object.prototype.hasOwnProperty.call(parsedValue.headers, key)) {
            request.headers[key] = parsedValue.headers[key];
          }
        }
      }

      if (parsedValue?.params !== undefined) request.params = parsedValue.params;
      if (parsedValue?.query !== undefined) request.query = parsedValue.query;
      if (parsedValue?.files !== undefined) request.files = parsedValue.files;
      if (parsedValue?.body !== undefined) request.body = parsedValue.body;

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
