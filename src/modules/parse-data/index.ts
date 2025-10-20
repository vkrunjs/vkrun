import { NextFunction, ParseDataConfig, Request, Response, VkrunParseData } from "../types";
import { isString, parseEscapeSQL } from "../utils";
import {
  getData,
  parseMultipartFormData,
  parseQuery,
  parseParams,
  parseFormUrlEncoded,
  parseJSON,
  decompressBody,
  matchMimeType,
} from "./helpers";

export class ParseDataSetup implements VkrunParseData {
  private readonly urlencoded: boolean = true;
  private readonly params: boolean = true;
  private readonly query: boolean = true;
  private readonly json: boolean = true;
  private readonly formData: boolean = true;
  private readonly escapeSQL: boolean = false;
  private readonly rawBody: boolean = false;
  private readonly maxBytes = 10 * 1024 * 1024;
  private readonly type?: string | RegExp;
  private readonly verify?: (req: Request, rawBuffer: Buffer, encoding?: string) => void;
  private readonly inflate: boolean = true;

  constructor(config?: ParseDataConfig) {
    // ---- Compatibilidade retroativa ----
    const parse = config?.parse;
    const body = config?.body;
    const security = config?.security;

    // ---- PARSE OPTIONS ----
    this.urlencoded = parse?.urlencoded ?? true;
    this.params = parse?.params ?? true;
    this.query = parse?.query ?? true;
    this.json = parse?.json ?? true;
    this.formData = parse?.formData ?? true;

    // ---- SECURITY OPTIONS ----
    this.escapeSQL = security?.escapeSQL ?? false;
    this.verify = security?.verify;

    // ---- BODY OPTIONS ----
    this.rawBody = body?.raw ?? false;
    this.maxBytes = body?.limit ?? 10 * 1024 * 1024; // ✅ default seguro 10MB
    this.type = body?.type;
    this.inflate = body?.inflate ?? true;
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const headerContentType = request.headers["content-type"];
      const contentEncoding = request.headers["content-encoding"];
      const encoding = (request.headers["content-encoding"] as string) || undefined;

      // --- PARSE URL PARAMS AND QUERY
      if (this.params) request.params = parseParams(request, this.escapeSQL);
      if (this.query) request.query = parseQuery(request, this.escapeSQL);

      // --- TYPE FILTER
      if (this.type && headerContentType) {
        let matches = false;

        if (typeof this.type === "string") {
          matches = matchMimeType(headerContentType, this.type);
        } else if (this.type instanceof RegExp) {
          matches = this.type.test(headerContentType);
        }

        if (!matches) {
          return next(); // Skip parsing if type doesn't match
        }
      }

      // --- READ RAW BODY
      let rawBody: Buffer;

      if (contentEncoding && /(gzip|deflate|br)/i.test(contentEncoding)) {
        if (!this.inflate) {
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Content-Type", "text/plain");
          response.status(415).end("Unsupported Content-Encoding");
          return;
        }

        try {
          rawBody = await decompressBody(request, contentEncoding, this.maxBytes);
        } catch (error: any) {
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Content-Type", "text/plain");

          if (error?.code === "PAYLOAD_TOO_LARGE") {
            response.status(413).end("Payload Too Large");
          } else if (error?.code === "UNSUPPORTED_ENCODING") {
            response.status(415).end("Unsupported Content-Encoding");
          } else {
            response.status(400).end("Invalid Compressed Data");
          }
          return;
        }
      } else {
        rawBody = await getData(request, this.maxBytes);
      }

      request.body = rawBody;

      // --- VERIFY CALLBACK
      if (this.verify) {
        try {
          this.verify(request, rawBody, encoding);
        } catch {
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Content-Type", "text/plain");
          response.status(400).end("Invalid Request Verification");
          return;
        }
      }

      // --- STORE RAW BODY
      if (this.rawBody) request.rawBody = rawBody;

      // --- PARSE BODY
      if (request.body) {
        if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
          if (this.json && headerContentType && headerContentType?.includes("application/json")) {
            request.body = parseJSON(request, this.escapeSQL);
          } else if (this.urlencoded && headerContentType && headerContentType?.includes("application/x-www-form-urlencoded")) {
            request.body = parseFormUrlEncoded(request, this.escapeSQL);
          } else if (this.formData && headerContentType && headerContentType?.includes("multipart/form-data")) {
            const parsedData = parseMultipartFormData(request, this.escapeSQL);
            request.body = parsedData.body;
            request.files = parsedData.files;
          } else {
            request.body = request.body.toString();
            if (this.escapeSQL && isString(request.body)) {
              request.body = parseEscapeSQL(request.body);
            }
          }
        } else {
          request.body = {};
        }
      } else {
        request.body = undefined;
      }
    } catch (error: any) {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Content-Type", "text/plain");

      if (error?.code === "PAYLOAD_TOO_LARGE") {
        response.status(413).end("Payload Too Large");
      } else {
        response.status(400).end("Invalid Request Data");
      }
      return;
    }
    next();
  }
}

/**
 * @function parseData
 *
 * ### 🧩 Overview
 * The `parseData` middleware is responsible for **interpreting incoming HTTP request data** —
 * including the body, query string, route parameters, and optional security filters.
 *
 * It automatically detects the `Content-Type` header and transforms the raw incoming data into a
 * structured JavaScript object (`req.body`, `req.query`, `req.params`), similar to Express' body parsers,
 * but with **more flexibility**, **no dependencies**, and **built-in security**.
 *
 * ---
 *
 * ### ⚙️ Supported Parsing Types
 *
 * | Source | Description | Default |
 * |---------|--------------|----------|
 * | **JSON** | Parses `application/json` requests. | ✅ |
 * | **URL-encoded** | Parses `application/x-www-form-urlencoded` requests. | ✅ |
 * | **Multipart form data** | Parses `multipart/form-data` (supports file uploads). | ✅ |
 * | **Query parameters** | Parses query strings from the URL (`?key=value`). | ✅ |
 * | **Route parameters** | Parses parameters from the route (`/users/:id`). | ✅ |
 *
 * ---
 *
 * ### 🛡️ Security Features
 *
 * - **SQL Escaping**: Prevents injection attempts by sanitizing special characters in request data.
 * - **Verification Callback**: Runs immediately after reading the raw body, allowing you to
 *   verify HMAC signatures or webhook authenticity before parsing.
 * - **Body Size Limit**: Rejects requests that exceed a configurable maximum payload size.
 * - **Automatic Decompression**: Supports gzip, deflate, and Brotli compressed bodies.
 *
 * ---
 *
 * ### 🔧 Configuration Groups
 *
 * `parseData` accepts an optional `ParseDataConfig` object divided into three semantic sections:
 *
 * ```ts
 * {
 *   parse?: { json?: boolean, urlencoded?: boolean, formData?: boolean, query?: boolean, params?: boolean },
 *   security?: { escapeSQL?: boolean, verify?: (req, rawBody, encoding?) => void },
 *   body?: { raw?: boolean, limit?: number, type?: string | RegExp, inflate?: boolean }
 * }
 * ```
 *
 * #### ⚙️ Example
 * ```ts
 * import { App, parseData } from "vkrun";
 *
 * const app = App();
 *
 * app.use(parseData({
 *   parse: { json: true, urlencoded: false }, // Disable URL-encoded parsing
 *   security: { escapeSQL: true },           // Enable SQL injection protection
 *   body: { limit: 5 * 1024 * 1024 },        // Limit body to 5MB
 * }));
 *
 * app.post("/user", (req, res) => {
 *   console.log(req.body); // Safely parsed data
 *   res.status(200).json({ received: true });
 * });
 * ```
 *
 * ---
 *
 * ### 🧠 Advanced Options
 *
 * #### `body.raw`
 * Stores the unparsed raw body (`Buffer`) in `req.rawBody`.
 * Useful for validating webhooks or digital signatures.
 *
 * ```ts
 * app.use(parseData({ body: { raw: true } }));
 * app.post("/webhook", (req, res) => {
 *   console.log(req.rawBody.toString()); // raw payload
 * });
 * ```
 *
 * #### `body.limit`
 * Defines the maximum allowed request size (in bytes).
 * Exceeding this limit triggers a `413 Payload Too Large` response.
 *
 * ```ts
 * app.use(parseData({ body: { limit: 1024 * 1024 } })); // 1 MB
 * ```
 *
 * #### `body.type`
 * Restricts body parsing to specific MIME types.
 * If the request’s `Content-Type` doesn’t match, only `query` and `params` will be parsed.
 *
 * ```ts
 * // Only process XML webhooks
 * app.use(parseData({ body: { type: "application/xml" } }));
 * ```
 *
 * **Supports:**
 * - `string`: `"application/json"` — direct match
 * - `RegExp`: `/^text\//` — pattern match
 *
 * #### `body.inflate`
 * Enables automatic decompression for requests with:
 * - `Content-Encoding: gzip`
 * - `Content-Encoding: deflate`
 * - `Content-Encoding: br`
 *
 * ```ts
 * // Disable inflate if you expect compressed payloads handled externally
 * app.use(parseData({ body: { inflate: false } }));
 * ```
 *
 * ---
 *
 * ### 🚨 Error Handling
 *
 * The middleware returns standardized HTTP responses for common parsing errors:
 *
 * | Error | Status | Message |
 * |--------|---------|----------|
 * | Body exceeds limit | **413** | `Payload Too Large` |
 * | Unsupported encoding | **415** | `Unsupported Content-Encoding` |
 * | Invalid gzip/deflate data | **400** | `Invalid Compressed Data` |
 * | Invalid verification | **400** | `Invalid Request Verification` |
 * | Generic parse error | **400** | `Invalid Request Data` |
 *
 * ---
 *
 * ### 🧪 Examples
 *
 * #### Parse All Data
 * ```ts
 * app.use(parseData());
 * app.post("/test/:id", (req, res) => {
 *   res.json({
 *     params: req.params,
 *     query: req.query,
 *     body: req.body,
 *   });
 * });
 * ```
 *
 * #### Use Route-Level Parsing
 * ```ts
 * router.post("/upload", parseData({ body: { type: "multipart/form-data" } }), (req, res) => {
 *   res.status(200).send(`Received ${req.files?.length} file(s)`);
 * });
 * ```
 *
 * ---
 *
 * @function parseData
 * @param {ParseDataConfig} [config] - Optional configuration to control parsing behavior.
 * @returns {VkrunParseData} Middleware instance implementing `handle(req, res, next)`.
 *
 * @see ParseDataConfig for detailed option breakdown.
 * @example
 * // Basic usage
 * const app = App();
 * app.use(parseData());
 *
 * // Advanced usage
 * app.use(parseData({
 *   body: { type: /^text\//, limit: 2 * 1024 * 1024 },
 *   security: { escapeSQL: true }
 * }));
 */
export const parseData = (config?: ParseDataConfig): VkrunParseData => {
  return new ParseDataSetup(config);
};
