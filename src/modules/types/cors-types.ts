import { NextFunction, Request, Response } from "./router-types";

export interface VkrunCors {
  handle: (request: Request, response: Response, next: NextFunction) => void;
}

export interface CorsOptions {
  origin: string | string[];
  methods: string | string[];
  preflightNext: boolean;
  successStatus: number;
  allowedHeaders?: string | undefined;
  exposedHeaders?: string | undefined;
  credentials?: boolean | undefined;
  maxAge?: number | undefined;
}

export interface CorsSetOptions {
  origin?: string | string[] | undefined;
  methods?: string | string[] | undefined;
  preflightNext?: boolean | undefined;
  successStatus?: number | undefined;
  allowedHeaders?: string | undefined;
  exposedHeaders?: string | undefined;
  credentials?: boolean | undefined;
  maxAge?: number | undefined;
}
