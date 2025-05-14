import { NextFunction, Request, Response } from "./router-types";

export interface VkrunRateLimitSetup {
  /** Time window in milliseconds during which requests are counted. */
  windowMs: number;

  /** Maximum number of requests allowed within the time window. */
  limit: number;

  /** Whether to include standard rate limit headers in the response. */
  standardHeaders: boolean;

  /** Whether to include legacy rate limit headers in the response. */
  legacyHeaders: boolean;

  /** Minimum number of exceeded requests required to trigger the notification callback. */
  minToNotification: number;

  /**
   * Optional callback that is invoked when the request limit is exceeded.
   * Receives detailed information about the offending access.
   */
  notification?: (access: RateLimitAccessData) => void;

  /**
   * Middleware function to apply rate limiting.
   * Should be used with app-level middleware like `app.use()` or on specific routes.
   */
  handle: (request: Request, response: Response, next: NextFunction) => void;
}

export interface RateLimitAccessData {
  /** Client's IP address. */
  remoteAddress: string;

  /** Network family (e.g., IPv4 or IPv6). */
  remoteFamily: string;

  /** Client's user-agent string. */
  userAgent: string;

  /** Exceeded request details. */
  exceeded: {
    /** Number of times the limit was exceeded. */
    count: number;

    /** List of individual requests that exceeded the limit. */
    requests: RateLimitExceededRequest[];
  };
}

export type RateLimitRequests = Map<
  string,
  {
    /** Total number of requests made during the current time window. */
    count: number;

    /** Exceeded limit tracking data. */
    exceeded: {
      /** Number of times the rate limit was exceeded. */
      count: number;

      /** Details of each exceeded request. */
      requests: RateLimitExceededRequest[];

      /** Whether the notification callback has already been triggered. */
      notificationSent: boolean;
    };
  }
>;

export interface RateLimitExceededRequest {
  /** Optional request ID, if available. */
  requestId?: string;

  /** Request route path. */
  route?: string;

  /** HTTP method of the request (e.g., GET, POST). */
  method?: string;
}

export interface RateLimitConfig {
  /**
   * Time window in milliseconds during which requests are counted.
   * Defaults to `60000` (1 minute).
   */
  windowMs?: number;

  /**
   * Maximum number of requests allowed within the time window.
   * Defaults to `100`.
   */
  limit?: number;

  /**
   * Whether to include standard rate limit headers:
   * - `X-RateLimit-Limit`
   * - `X-RateLimit-Remaining`
   * - `X-RateLimit-Reset`
   * Defaults to `true`.
   */
  standardHeaders?: boolean;

  /**
   * Whether to include legacy rate limit headers:
   * - `X-RateLimit-Limit-Legacy`
   * - `X-RateLimit-Remaining-Legacy`
   * - `X-RateLimit-Reset-Legacy`
   * Defaults to `false`.
   */
  legacyHeaders?: boolean;

  /**
   * Minimum number of exceeded attempts required to trigger the `notification` callback.
   * Defaults to `0`.
   */
  minToNotification?: number;

  /**
   * Optional callback invoked when the number of exceeded requests meets or exceeds `minToNotification`.
   */
  notification?: (access: RateLimitAccessData) => void;

  /**
   * Unique ID for this rate limiter instance.
   * Used to isolate request tracking under the same namespace.
   * If omitted, a UUID will be generated automatically.
   */
  instanceId?: string;

  /**
   * Global namespace used to isolate storage across multiple instances of the rate limiter.
   * Defaults to `"default"`. Useful to avoid request conflicts between different route groups.
   */
  namespace?: string;
}
