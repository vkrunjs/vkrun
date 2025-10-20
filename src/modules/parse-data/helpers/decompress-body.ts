import { gunzipSync, inflateSync, brotliDecompressSync } from "zlib";
import { Request } from "../../types";
import { getData } from "./get-data";

export const decompressBody = async (request: Request, encoding: string, maxBytes: number): Promise<Buffer> => {
  const compressed = await getData(request, maxBytes);

  try {
    if (/gzip/i.test(encoding)) {
      return gunzipSync(compressed);
    } else if (/deflate/i.test(encoding)) {
      return inflateSync(compressed);
    } else if (/br/i.test(encoding)) {
      return brotliDecompressSync(compressed);
    }

    const err: any = new Error("Unsupported Content-Encoding");
    err.code = "UNSUPPORTED_ENCODING";
    throw err;
  } catch (error: any) {
    if (error?.code === "Z_BUF_ERROR" || error?.code === "Z_DATA_ERROR") {
      const err: any = new Error("Invalid Compressed Data");
      err.code = "INVALID_COMPRESSED";
      throw err;
    }
    throw error;
  }
};
