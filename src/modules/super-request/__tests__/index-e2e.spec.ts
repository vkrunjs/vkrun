import { createReadStream, existsSync, readFileSync, unlinkSync, writeFileSync, join } from "../../runtime";
import FormData from "form-data";
import { isBuffer, isUUID } from "../../utils";
import { App } from "../../app";
import { Request, Response } from "../../types";
import { superRequest } from "..";

describe("Super Request - end to end testing", () => {
  const validateSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200);
    expect(response.statusMessage).toEqual("OK");
    expect(isUUID(response.headers["request-id"])).toBeTruthy();
    expect(response.headers.connection).toEqual("close");
  };

  it("Should parse form data body in POST method", async () => {
    let requestBody: any;
    let requestFiles: any;

    const app = App();
    app.parseData();

    app.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      requestFiles = request.files;
      response.status(200).end();
    });

    const fileContent = "Text file";
    const fileName = "filename.txt";
    const filePath = join(__dirname, fileName);

    writeFileSync(filePath, fileContent);

    const data = new FormData();
    data.append("string", "any@mail.com");
    data.append("integer", String(123));
    data.append("float", String(1.56));
    data.append("boolean", String(true));
    data.append("date", new Date("2000-02-03T02:00:00.000Z").toISOString());

    const fileBuffer = readFileSync(filePath);
    data.append("file", fileBuffer, fileName);

    const response = await superRequest(app).post("/body-post", data);

    unlinkSync(filePath);

    writeFileSync(filePath, requestFiles[0].buffer);
    const fileExists = existsSync(filePath);
    expect(fileExists).toBeTruthy();
    const savedFileContent = readFileSync(filePath, "utf-8");
    expect(savedFileContent).toEqual(fileContent);
    unlinkSync(filePath);

    validateSuccess(response);
    expect(requestBody).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });
    expect(requestFiles[0].filename).toEqual("filename.txt");
    expect(requestFiles[0].mimetype).toEqual("text/plain");
    expect(requestFiles[0].extension).toEqual("txt");

    app.close();
  });

  it("Should parse query parameters correctly", async () => {
    let requestQuery;

    const app = App();
    app.parseData();

    app.get("/query", (req: Request, res: Response) => {
      requestQuery = req.query;
      res.status(200).end();
    });

    const query = "name=John&age=30&boolean=true";
    const response = await superRequest(app).get(`/query?${query}`);

    validateSuccess(response);
    expect(requestQuery).toEqual({ name: "John", age: "30", boolean: true });

    app.close();
  });

  it("Should parse JSON body in POST method", async () => {
    let requestBody;

    const app = App();
    app.parseData();

    app.post("/json", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    const data = { name: "John", age: 30, isAdmin: true };

    const response = await superRequest(app).post("/json", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should parse URL encoded body in POST method", async () => {
    let requestBody;

    const app = App();
    app.parseData();

    app.post("/urlencoded", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    const urlencoded = "name=John&age=30&isAdmin=true";
    const response = await superRequest(app).post("/urlencoded", urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({ name: "John", age: "30", isAdmin: true });

    app.close();
  });

  it("Should handle PUT requests", async () => {
    let requestBody;

    const app = App();
    app.parseData();

    app.put("/update", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    const data = { name: "Updated Name", age: 31 };

    const response = await superRequest(app).put("/update", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should handle PATCH requests", async () => {
    let requestBody;

    const app = App();
    app.parseData();

    app.patch("/modify", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    const data = { age: 32 };

    const response = await superRequest(app).patch("/modify", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should handle DELETE requests", async () => {
    const app = App();
    app.parseData();

    app.delete("/delete/:id", (req: Request<{ params: { id: string } }>, res: Response) => {
      res.status(200).json({ deletedId: req?.params?.id });
    });

    const response = await superRequest(app).delete("/delete/1");

    expect(response.statusCode).toEqual(200);
    expect(response.data).toEqual({ deletedId: "1" });

    app.close();
  });

  it("Should handle HEAD requests", async () => {
    const app = App();

    app.head("/info", (req: Request, res: Response) => {
      res.setHeader("X-Custom-Header", "CustomValue");
      res.status(200).end();
    });

    const response = await superRequest(app).head("/info");

    expect(response.statusCode).toEqual(200);
    expect(response.headers["x-custom-header"]).toEqual("CustomValue");

    app.close();
  });

  it("Should handle OPTIONS requests", async () => {
    const app = App();

    app.options("/options", (req: Request, res: Response) => {
      res.setHeader("Allow", "GET,POST,OPTIONS");
      res.status(204).end();
    });

    const response = await superRequest(app).options("/options");

    expect(response.statusCode).toEqual(204);
    expect(response.headers.allow).toEqual("GET,POST,OPTIONS");

    app.close();
  });

  it("Should handle non-existent route with 404", async () => {
    const app = App();

    await superRequest(app)
      .get("/non-existent")
      .catch((error) => {
        expect(error.response.statusCode).toEqual(404);
        expect(error.response.statusMessage).toEqual("Not Found");
      });

    app.close();
  });

  it("Should handle asynchronous response with delay", async () => {
    const app = App();

    app.get("/", (req: Request, res: Response) => {
      setTimeout(() => {
        res.status(200).send("waited 100ms");
      }, 100);
    });

    await superRequest(app)
      .get("/")
      .then((response) => {
        validateSuccess(response);
        expect(response.data).toEqual("waited 100ms");
      });

    app.close();
  });

  it("Should handle file streaming with response pipe", async () => {
    const app = App();

    const fileContent = "Text file";
    const fileName = "filename.txt";
    const filePath = join(__dirname, fileName);

    writeFileSync(filePath, fileContent);

    app.get("/", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Disposition", 'filename="filename.txt"');
      const fileStream = createReadStream(filePath);
      return fileStream.pipe(res);
    });

    await superRequest(app)
      .get("/")
      .then((response) => {
        expect(isBuffer(response.data)).toBeTruthy();
      });

    unlinkSync(filePath);

    app.close();
  });
});
