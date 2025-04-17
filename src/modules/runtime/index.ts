import {
  existsSync,
  readFileSync,
  appendFileSync,
  mkdirSync,
  writeFileSync,
  promises,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  chmodSync,
  createReadStream,
} from "fs";
import { join, resolve, basename, isAbsolute } from "path";
import { randomBytes, createCipheriv, createDecipheriv, randomUUID } from "crypto";
import { createSocket } from "dgram";
import { Socket } from "net";
import { parse } from "querystring";
import http, { ServerResponse, createServer, request, RequestOptions } from "http";
import https from "https";
import { RouterCookieOptions } from "../types";
import { isArray, isObject } from "../utils";

declare module "http" {
  interface ServerResponse {
    status: (status: number) => Omit<ServerResponse, "redirect">;
    json: (data: object) => ServerResponse;
    html: (strings: TemplateStringsArray, ...values: unknown[]) => ServerResponse;
    redirect: (url: string) => ServerResponse;
    send: (data: any) => ServerResponse;
    setCookie: (name: string, value: string, options?: RouterCookieOptions) => ServerResponse;
    clearCookie: (name: string) => ServerResponse;
    _body: any;
  }
}

ServerResponse.prototype.status = function (status: number): Omit<ServerResponse, "redirect"> {
  this.statusCode = status;
  return this;
};

ServerResponse.prototype.json = function (body: object): ServerResponse {
  this.setHeader("Content-Type", "application/json");
  this.end(JSON.stringify(body));
  return this;
};

ServerResponse.prototype.html = function (strings: TemplateStringsArray, ...values: unknown[]): ServerResponse {
  const htmlContent = strings.reduce((acc, str, i) => {
    const value = values[i];
    const safeValue = typeof value === "string" ? value : String(value ?? "");
    return acc + str + safeValue;
  }, "");

  if (!this.hasHeader("Content-Type")) {
    this.setHeader("Content-Type", "text/html");
  }
  this.end(htmlContent);
  return this;
};

ServerResponse.prototype.redirect = function (url: string): ServerResponse {
  const requestModule = url.startsWith("https") ? https : http;

  const options = {
    method: this.req.method, // Usa o método da requisição original
    headers: this.req.headers,
  };

  const handleResponse = (externalRes: http.IncomingMessage): void => {
    // Copies the headers from the outer response to the original response
    Object.entries(externalRes.headers).forEach(([key, value]) => {
      if (value) {
        this.setHeader(key, value);
      }
    });

    // Wait for the external response body
    let data = "";
    externalRes.on("data", (chunk) => {
      data += chunk;
    });

    externalRes.on("end", () => {
      // Send the response to the original client
      this.statusCode = externalRes.statusCode ?? 302; // Default status for redirection
      this.end(data);
    });

    externalRes.on("error", (err) => {
      // Error handling during external response
      this.statusCode = 500;
      this.end(`Error while redirecting: ${err.message}`);
    });
  };

  const req = requestModule.request(url, options, handleResponse);

  req.on("error", (err) => {
    this.statusCode = 500;
    this.end(`Request error: ${err.message}`);
    return this;
  });

  // Adds the request body, if it exists
  if (this.req.body) {
    if (
      this.req.headers?.["content-type"].includes("application/json") &&
      (isObject(this.req.body) || isArray(this.req.body))
    ) {
      req.end(JSON.stringify(this.req.body));
    } else {
      req.end(this.req.body);
    }
  } else {
    req.end();
  }

  return this;
};

ServerResponse.prototype.send = function (body: any): ServerResponse {
  if (!this.hasHeader("Content-Type")) {
    this.setHeader("Content-Type", "text/plain");
  }
  this.end(body.toString());
  return this;
};

ServerResponse.prototype.setCookie = function (name: string, value: string, options: RouterCookieOptions = {}): ServerResponse {
  let cookie = `${name}=${value}`;
  if (options.httpOnly) cookie += "; HttpOnly";
  if (options.secure) cookie += "; Secure";
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;

  const existingCookies = this.getHeader("Set-Cookie") ?? [];
  this.setHeader("Set-Cookie", Array.isArray(existingCookies) ? [...existingCookies, cookie] : [cookie]);
  return this;
};

ServerResponse.prototype.clearCookie = function (name: string): ServerResponse {
  const expiredCookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  const existingCookies = this.getHeader("Set-Cookie") ?? [];
  this.setHeader("Set-Cookie", Array.isArray(existingCookies) ? [...existingCookies, expiredCookie] : [expiredCookie]);
  return this;
};

export {
  http,
  https,
  request,
  RequestOptions,
  ServerResponse,
  createServer,
  createReadStream,
  existsSync,
  readFileSync,
  appendFileSync,
  writeFileSync,
  mkdirSync,
  resolve,
  join,
  promises,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  chmodSync,
  basename,
  isAbsolute,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createSocket,
  Socket,
  parse,
  randomUUID,
};
