import { RateLimitAccessData, NextFunction, RateLimitConfig, RateLimitRequests, Request, Response } from "../types";

export class RateLimitSetup {
  private readonly windowMs: number;
  private readonly limit: number;
  private readonly standardHeaders: boolean;
  private readonly legacyHeaders: boolean;
  private readonly notification?: (access: RateLimitAccessData) => void;
  private readonly minToNotification: number;
  private readonly requests: RateLimitRequests;
  private readonly expirationTimers: Map<string, NodeJS.Timeout>;

  constructor(config?: RateLimitConfig) {
    this.windowMs = config?.windowMs ?? 60 * 1000; // Default: 1 minute
    this.limit = config?.limit ?? 100;
    this.standardHeaders = config?.standardHeaders ?? true;
    this.legacyHeaders = config?.legacyHeaders ?? false;
    this.notification = config?.notification;
    this.minToNotification = config?.minToNotification ?? 0;
    this.requests = new Map();
    this.expirationTimers = new Map(); // Inicializando a lista de timers
  }

  handle(
    request: Request & { setTimer: (callback: () => void, ms: number) => NodeJS.Timeout },
    response: Response,
    next: NextFunction,
  ): void {
    const remoteAddress = request.socket.remoteAddress ?? "127.0.0.1";
    const remoteFamily = request.socket.remoteFamily ?? "";
    const userAgent = request.headers["user-agent"] ?? "";
    const key = `${remoteAddress}-${remoteFamily}`;

    let requestInfo = this.requests.get(key);
    if (!requestInfo) {
      requestInfo = { count: 0, exceeded: { count: 0, requests: [], notificationSent: false } };
    }

    requestInfo.count++;

    if (requestInfo.count <= this.limit) {
      this.requests.set(key, requestInfo);
    } else {
      requestInfo.exceeded.count++;
      requestInfo.exceeded.requests.push({
        requestId: request.requestId,
        method: request.method,
        route: request.url,
      });

      if (!requestInfo.exceeded.notificationSent && this.notification && requestInfo.exceeded.count >= this.minToNotification) {
        this.notification({
          remoteAddress,
          remoteFamily,
          userAgent,
          exceeded: {
            count: requestInfo.exceeded.count,
            requests: requestInfo.exceeded.requests,
          },
        });
        requestInfo.exceeded.notificationSent = true;
      }

      this.requests.set(key, requestInfo);
      response.setHeader("Content-Type", "text/plain");
      response.statusCode = 429;
      response.end("Too Many Requests");
      return;
    }

    if (request?.setTimer) {
      request.setTimer(() => {
        this.requests.delete(key);
      }, this.windowMs);
    } else {
      const timer = setTimeout(() => {
        this.requests.delete(key);
        this.expirationTimers.delete(key);
      }, this.windowMs);

      this.expirationTimers.set(key, timer);
    }

    if (this.standardHeaders) {
      const remaining = Math.max(0, this.limit - requestInfo.count);
      const resetTime = Math.ceil((Date.now() + this.windowMs) / 1000);

      response.setHeader("X-RateLimit-Limit", String(this.limit));
      response.setHeader("X-RateLimit-Remaining", String(remaining));
      response.setHeader("X-RateLimit-Reset", String(resetTime));
    }

    if (this.legacyHeaders) {
      const remainingLegacy = Math.max(0, this.limit - requestInfo.count);
      const resetTimeLegacy = Math.ceil((Date.now() + this.windowMs) / 1000);

      response.setHeader("X-RateLimit-Limit-Legacy", String(this.limit));
      response.setHeader("X-RateLimit-Remaining-Legacy", String(remainingLegacy));
      response.setHeader("X-RateLimit-Reset-Legacy", String(resetTimeLegacy));
    }

    next();
  }
}

/**
 * @function rateLimit
 *
 * A middleware function that applies rate limiting to incoming requests. It limits the number of requests that can
 * be made to your application within a specific time window. This helps protect against abuse or excessive requests
 * from clients.
 *
 * The middleware will track the number of requests from each unique client and will respond with a `429 Too Many Requests`
 * error if the limit is exceeded. It supports both standard and legacy rate limit headers, as well as custom notifications
 * when the rate limit is exceeded.
 *
 * **Available Options:**
 * - **`windowMs`**: Time window for rate limiting in milliseconds (default: 1 minute).
 * - **`limit`**: Maximum number of requests allowed within the window (default: 100).
 * - **`standardHeaders`**: Whether to include standard rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`). Defaults to `true`.
 * - **`legacyHeaders`**: Whether to include legacy rate limit headers (`X-RateLimit-Limit-Legacy`, `X-RateLimit-Remaining-Legacy`, `X-RateLimit-Reset-Legacy`). Defaults to `false`.
 * - **`notification`**: A function that is called when the rate limit is exceeded. It receives an object with the access data and exceeded requests.
 * - **`minToNotification`**: Minimum number of exceeded requests to trigger the notification (default: 0).
 *
 * **Usage Example:**
 * ```ts
 * import { App, rateLimit } from 'vkrun'
 *
 * const app = App()
 * const rateLimitConfig = {
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   limit: 100,
 *   notification: (access) => {
 *     console.log('Rate limit exceeded:', access)
 *   }
 * }
 * app.use(rateLimit(rateLimitConfig)) // Apply rate limit middleware
 *
 * app.get('/rate-limit', (req, res) => {
 *   res.status(200).send('Rate limit example')
 * })
 *
 * app.server().listen(3000, () => {
 *   console.log('Server running on port 3000')
 * })
 * ```
 * In this example:
 * - The rate limit is applied with a 15-minute window and a limit of 100 requests.
 * - If the rate limit is exceeded, the `notification` function is triggered.
 *
 * @param {RateLimitConfig} [config] - Configuration object to customize the rate limit behavior.
 * @returns {RateLimitSetup} - Returns an instance of `RateLimitSetup` to handle rate limiting logic.
 *
 * @example
 * ```ts
 * // Example with custom configuration
 * const app = App()
 * const rateLimitConfig = { windowMs: 15 * 60 * 1000, limit: 50 }
 * app.use(rateLimit(rateLimitConfig)) // Apply rate limit middleware with a 15-minute window and a 50-request limit
 * ```
 */
export const rateLimit = (config?: RateLimitConfig): RateLimitSetup => {
  return new RateLimitSetup(config);
};
