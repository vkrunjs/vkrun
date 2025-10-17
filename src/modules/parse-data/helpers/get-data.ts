import { Request } from "../../types";

export const getData = async (request: Request, limit: number): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;

    request.on("data", (chunk: Buffer) => {
      total += chunk.length;
      if (total > limit) {
        const err = new Error("Payload Too Large");
        (err as any).code = "PAYLOAD_TOO_LARGE";
        return reject(err);
      }
      chunks.push(chunk);
    });

    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", (err) => {
      (err as any).code = "STREAM_ERROR";
      reject(err);
    });
  });
};
