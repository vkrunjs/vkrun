import { randomUUID } from "../runtime";
import {
  RateLimitAccessData,
  RateLimitConfig,
  RateLimitRequests,
  VkrunRateLimitSetup,
  Request,
  Response,
  NextFunction,
} from "../types";

let globalRequestsByNamespace = new Map<string, Map<string, RateLimitRequests>>();
let globalTimersByNamespace = new Map<string, Map<string, Map<string, NodeJS.Timeout>>>();

/**
 * Clears all global rate limit data across all namespaces and instances.
 * This includes request counts and expiration timers.
 */
export const clearGlobalRateLimit = () => {
  for (const timersByInstance of globalTimersByNamespace.values()) {
    for (const timerMap of timersByInstance.values()) {
      for (const timer of timerMap.values()) {
        clearTimeout(timer);
      }
      timerMap.clear();
    }
    timersByInstance.clear();
  }

  for (const requestMapByInstance of globalRequestsByNamespace.values()) {
    for (const requestMap of requestMapByInstance.values()) {
      requestMap.clear();
    }
    requestMapByInstance.clear();
  }

  globalTimersByNamespace.clear();
  globalRequestsByNamespace.clear();
};

class RateLimitSetup implements VkrunRateLimitSetup {
  public readonly windowMs: number;
  public readonly limit: number;
  public readonly standardHeaders: boolean;
  public readonly legacyHeaders: boolean;
  public readonly minToNotification: number;
  public readonly notification?: (access: RateLimitAccessData) => void;
  private readonly onError?: (request: Request, response: Response) => void | Promise<void>;

  private readonly namespace: string;
  private readonly instanceId: string;
  private readonly requests: RateLimitRequests;
  private readonly expirationTimers: Map<string, NodeJS.Timeout>;

  constructor(config: RateLimitConfig = {}) {
    this.windowMs = config.windowMs ?? 60_000;
    this.limit = config.limit ?? 100;
    this.standardHeaders = config.standardHeaders ?? true;
    this.legacyHeaders = config.legacyHeaders ?? false;
    this.minToNotification = config.minToNotification ?? 0;
    this.notification = config.notification;
    this.onError = config.onError;

    this.namespace = config.namespace ?? "default";
    this.instanceId = config.instanceId ?? randomUUID();

    if (!globalRequestsByNamespace.has(this.namespace)) {
      globalRequestsByNamespace.set(this.namespace, new Map());
      globalTimersByNamespace.set(this.namespace, new Map());
    }

    const instanceRequestMap = globalRequestsByNamespace.get(this.namespace)!;
    const instanceTimerMap = globalTimersByNamespace.get(this.namespace)!;

    if (!instanceRequestMap.has(this.instanceId)) {
      instanceRequestMap.set(this.instanceId, new Map());
      instanceTimerMap.set(this.instanceId, new Map());
    }

    this.requests = instanceRequestMap.get(this.instanceId)!;
    this.expirationTimers = instanceTimerMap.get(this.instanceId)!;
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    const remoteAddress = request.socket.remoteAddress ?? "127.0.0.1";
    const remoteFamily = request.socket.remoteFamily ?? "";
    const userAgent = request.headers["user-agent"] ?? "";
    const key = `${remoteAddress}-${remoteFamily}`;

    const now = Date.now();
    let info = this.requests.get(key);

    if (!info) {
      info = {
        count: 0,
        exceeded: { count: 0, requests: [], notificationSent: false },
      };
      this.requests.set(key, info);

      const timer = setTimeout(() => {
        this.requests.delete(key);
        this.expirationTimers.delete(key);
      }, this.windowMs);
      this.expirationTimers.set(key, timer);
    }

    info.count++;

    if (info.count > this.limit) {
      info.exceeded.count++;
      info.exceeded.requests.push({
        requestId: request.requestId,
        method: request.method,
        route: request.url,
      });

      if (!info.exceeded.notificationSent && this.notification && info.exceeded.count >= this.minToNotification) {
        this.notification({
          remoteAddress,
          remoteFamily,
          userAgent,
          exceeded: {
            count: info.exceeded.count,
            requests: info.exceeded.requests,
          },
        });
        info.exceeded.notificationSent = true;
      }

      this.requests.set(key, info);

      if (this.onError) {
        await this.onError(request, response);
      } else {
        response.setHeader("Content-Type", "text/plain");
        response.statusCode = 429;
        response.end("Too Many Requests");
      }

      return;
    }

    if (this.standardHeaders) {
      const remaining = Math.max(0, this.limit - info.count);
      const resetTime = Math.ceil((now + this.windowMs) / 1000);
      response.setHeader("X-RateLimit-Limit", String(this.limit));
      response.setHeader("X-RateLimit-Remaining", String(remaining));
      response.setHeader("X-RateLimit-Reset", String(resetTime));
    }

    if (this.legacyHeaders) {
      const remainingLegacy = Math.max(0, this.limit - info.count);
      const resetTimeLegacy = Math.ceil((now + this.windowMs) / 1000);
      response.setHeader("X-RateLimit-Limit-Legacy", String(this.limit));
      response.setHeader("X-RateLimit-Remaining-Legacy", String(remainingLegacy));
      response.setHeader("X-RateLimit-Reset-Legacy", String(resetTimeLegacy));
    }

    next();
  }
}

export const rateLimit = (config?: RateLimitConfig): VkrunRateLimitSetup => {
  return new RateLimitSetup(config);
};
