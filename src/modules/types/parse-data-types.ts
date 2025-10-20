import { NextFunction, Request, Response } from "./router-types";

export interface VkrunParseData {
  handle: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}

/**
 * Configuration for the `parseData` middleware.
 *
 * ---
 * ### 🔍 Overview
 * The `parseData` middleware automatically parses incoming request data —
 * including the **body**, **query**, and **URL parameters** —
 * adapting its behavior based on the content type and configuration.
 *
 * You can customize its behavior through three logical groups:
 * - **`parse`** → what data sources to parse
 * - **`body`** → how to handle request bodies
 * - **`security`** → how to validate or sanitize incoming data
 *
 * ---
 * ### 🧩 Example
 * ```ts
 * app.use(parseData({
 *   parse: { json: true, formData: true },
 *   body: { limit: 5 * 1024 * 1024, type: /^application\/(json|xml)$/ },
 *   security: { escapeSQL: true }
 * }));
 * ```
 */
export interface ParseDataConfig {
  /**
   * 🧾 Parsing behavior — defines which parts of the request should be interpreted.
   */
  parse?: {
    /** Parse URL-encoded form data (`application/x-www-form-urlencoded`). @default true */
    urlencoded?: boolean;

    /** Parse route parameters (e.g., `/users/:id`). @default true */
    params?: boolean;

    /** Parse query string parameters (e.g., `?search=term`). @default true */
    query?: boolean;

    /** Parse JSON request bodies (`application/json`). @default true */
    json?: boolean;

    /** Parse multipart form data (`multipart/form-data`). @default true */
    formData?: boolean;
  };

  /**
   * ⚙️ Body handling — controls how the request body is read, stored, and limited.
   */
  body?: {
    /**
     * Store the raw, unparsed request body (`Buffer`) in `req.rawBody`.
     * Useful for verifying signatures (e.g., webhooks) or implementing custom parsers.
     * @default false
     */
    raw?: boolean;

    /**
     * Maximum allowed body size in bytes.
     * Requests exceeding this limit return `413 Payload Too Large`.
     * @default 10 * 1024 * 1024 (10 MB)
     */
    limit?: number;

    /**
     * Accepted MIME type(s) for body parsing.
     * - If provided, only matching `Content-Type` requests are parsed.
     * - Non-matching requests still have `params` and `query` parsed.
     *
     * @example `"application/json"` | `/^text\//`
     * @default undefined (all supported types)
     */
    type?: string | RegExp;

    /**
     * Automatically decompress gzip/deflate/br request bodies.
     * When disabled, compressed payloads remain raw.
     * @default true
     */
    inflate?: boolean;
  };

  /**
   * 🛡️ Security and validation — protects against SQL injection and invalid requests.
   */
  security?: {
    /**
     * Escape SQL-related characters from all incoming strings to mitigate SQL injection attacks.
     * @default false
     */
    escapeSQL?: boolean;

    /**
     * Verification hook that runs after reading the raw body but before parsing it.
     * Throwing an error here immediately rejects the request with `400 Bad Request`.
     *
     * Ideal for verifying webhook signatures.
     *
     * @param req Incoming request
     * @param rawBuffer Raw request body
     * @param encoding Optional encoding from headers
     *
     * @example
     * ```ts
     * verify: (req, buf) => {
     *   const sig = req.headers["x-signature"];
     *   const expected = crypto.createHmac("sha256", SECRET).update(buf).digest("hex");
     *   if (sig !== expected) throw new Error("Invalid signature");
     * }
     * ```
     */
    verify?: (req: Request, rawBuffer: Buffer, encoding?: string) => void;
  };
}
