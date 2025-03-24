import { ServerResponse } from "../../runtime";
import { isObject } from "../../utils";
import { RouterCookieOptions, Response } from "../../types";

export const customResponse = (_response: ServerResponse): Response => {
  const response = _response as Response;
  /* eslint-disable */
  // @ts-ignore
  response._setHeader = response.setHeader;

  response.setHeader = function (name: string, value: number | string | readonly string[]): Response {
    // @ts-ignore
    response._setHeader(name, value);
    return this;
  };
  /* eslint-enable */

  response.status = function (status: number): Response {
    this.statusCode = status;
    return this;
  };

  response.json = function (body: object): Response {
    this.setHeader("Content-Type", "application/json");
    if (isObject(body)) {
      response._body = body;
      return this.end(JSON.stringify(body));
    } else {
      response._body = {};
      return this.end(JSON.stringify({}));
    }
  };

  response.send = function (body: any): Response {
    const hasHeadersContentType = response.hasHeader("content-type");
    response._body = body;

    if (hasHeadersContentType) return this.end(body);
    else {
      response.setHeader("Content-Type", "text/plain");
      return this.end(body.toString());
    }
  };

  response.setCookie = function (name: string, value: string, options?: RouterCookieOptions): Response {
    const existingCookies = this.getHeader("Set-Cookie") as string[] | undefined;

    let cookies: string[] = [];

    if (existingCookies) {
      cookies = existingCookies.slice();
    }

    let cookie = `${name}=${value}`;

    if (options?.httpOnly) {
      cookie += `; HttpOnly=${options.httpOnly}`;
    }
    if (options?.maxAge) {
      cookie += `; Max-Age=${options.maxAge}`;
    }
    if (options?.path) {
      cookie += `; Path=${options.path}`;
    }
    if (options?.secure) {
      cookie += `; Secure=${options.secure}`;
    }
    if (options?.sameSite) {
      cookie += `; SameSite=${options.sameSite}`;
    }
    if (options?.domain) {
      cookie += `; Domain=${options.domain}`;
    }
    if (options?.priority) {
      cookie += `; Priority=${options.priority}`;
    }
    if (options?.expires) {
      cookie += `; Expires=${options.expires}`;
    }

    cookies.push(cookie);

    this.setHeader("Set-Cookie", cookies);
    return this;
  };

  response.clearCookie = function (name: string): Response {
    const existingCookies = this.getHeader("Set-Cookie") as string[] | undefined;
    let cookies: string[] = [];

    if (existingCookies) {
      cookies = existingCookies.slice();
    }

    const removedCookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    cookies.push(removedCookie);
    this.setHeader("Set-Cookie", cookies);
    return this;
  };

  return response;
};
