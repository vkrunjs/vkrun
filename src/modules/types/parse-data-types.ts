import { NextFunction, Request, Response } from "./router-types";

export interface VkrunParseData {
  handle: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}

export interface ParseDataConfig {
  /**
   * Enable or disable parsing of URL-encoded form data (`application/x-www-form-urlencoded`).
   * @default true
   */
  urlencoded?: boolean;

  /**
   * Enable or disable parsing of route parameters (e.g., `/users/:id`).
   * @default true
   */
  params?: boolean;

  /**
   * Enable or disable parsing of query parameters (e.g., `?search=term`).
   * @default true
   */
  query?: boolean;

  /**
   * Enable or disable parsing of JSON request bodies (`application/json`).
   * @default true
   */
  json?: boolean;

  /**
   * Enable or disable parsing of multipart form data (`multipart/form-data`).
   * @default true
   */
  formData?: boolean;

  /**
   * Enable or disable SQL escaping for incoming data to prevent SQL injection attacks.
   * @default false
   */
  escapeSQL?: boolean;
}
