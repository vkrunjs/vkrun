import { RequestOptions, request } from "../../runtime";
import { isObject } from "../../utils";
import { FakeSocket } from "./fake-socket";

export const createHttpRequest = (params: {
  method: any;
  path: any;
  headers: Record<string, any>;
  data: any;
  host: string;
  port: number;
}): any => {
  const { method, path, headers, host, port, data } = params;

  const options: RequestOptions = {
    ...new URL(`http://${host}${path}`),
    method,
    headers,
    hostname: host,
    port,
    path,
  };

  let fakeRequest: any;
  try {
    fakeRequest = request(options);
  } catch (error: any) {
    throw new Error(`vkrun-superRequest: ${error?.message}`);
  }

  fakeRequest.socket = new FakeSocket();
  fakeRequest.method = method;
  fakeRequest.url = path.replaceAll(" ", "%20");

  const lowercaseHeaders: Record<string, any> = {};
  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      lowercaseHeaders[key.toLowerCase()] = headers[key];
    }
  }
  fakeRequest.headers = lowercaseHeaders;

  const headerContentType = fakeRequest.headers["content-type"];
  const headerContentEncoding = fakeRequest.headers["content-encoding"];

  if (!headerContentType && isObject(data)) {
    fakeRequest.headers["content-type"] = "application/json";
  } else if (!headerContentType && data) {
    fakeRequest.headers["content-type"] = "text/plain";
  }

  // ✅ Preserve binary buffer when compressed (gzip/deflate/br)
  if (Buffer.isBuffer(data) && headerContentEncoding) {
    fakeRequest.on = (event: string, listener: any) => {
      if (event === "data") listener(data);
      if (event === "end") listener();
      return fakeRequest;
    };
    fakeRequest.abort();
    return fakeRequest;
  }

  // Legacy payload builder (unchanged)
  const generateBufferData = (): Buffer => {
    if (headerContentType?.includes("multipart/form-data") || (data?._boundary && data?._streams)) {
      if (!headerContentType) {
        fakeRequest.headers["content-type"] = `multipart/form-data; boundary=${data._boundary}`;
      } else if (data && !headerContentType.includes("boundary=")) {
        fakeRequest.headers["content-type"] = `${headerContentType}; boundary=${data._boundary}`;
      }

      if (!data) return Buffer.alloc(0);

      const filteredData = data._streams.filter((element: any) => typeof element !== "function");
      const parts: Buffer[] = [];

      for (let i = 0; i < filteredData.length; i += 2) {
        const header = Buffer.from(filteredData[i], "utf-8");
        const value = typeof filteredData[i + 1] === "string" ? Buffer.from(filteredData[i + 1], "utf-8") : filteredData[i + 1];
        parts.push(header, value, Buffer.from("\r\n", "utf-8"));
      }

      return Buffer.concat(parts);
    } else if (isObject(data)) {
      return Buffer.from(JSON.stringify(data), "utf-8");
    } else {
      return data ? Buffer.from(data.toString(), "utf-8") : Buffer.alloc(0);
    }
  };

  const bufferData = generateBufferData();

  fakeRequest.on = (event: string, listener: any) => {
    if (event === "data") listener(bufferData);
    if (event === "end") listener();
    return fakeRequest;
  };

  fakeRequest.abort();

  return fakeRequest;
};
