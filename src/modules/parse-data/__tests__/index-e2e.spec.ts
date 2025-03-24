import { writeFileSync, unlinkSync, readFileSync, existsSync, join } from "../../runtime";
import FormData from "form-data";
import { isString, isUUID } from "../../utils";
import { App } from "../../app";
import { parseData } from "..";
import { Router } from "../../router";
import { Request, Response } from "../../types";
import { superRequest } from "../../super-request";

describe("Parse Data - end to end testing using super request", () => {
  const validateSuccess = (response: any): void => {
    expect(response.statusCode).toEqual(200);
    expect(response.statusMessage).toEqual("OK");
    expect(Object.keys(response.headers).length).toEqual(4);
    expect(isUUID(response.headers["request-id"])).toBeTruthy();
    expect(isString(response.headers.date)).toBeTruthy();
    expect(response.headers.connection).toEqual("close");
    expect(response.headers["content-length"]).toEqual("0");
    expect(response.data).toEqual("");
  };

  it("Should be able to parse query url", async () => {
    let requestQuery;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.get("/query", (request: Request, response: Response) => {
      requestQuery = request.query;
      response.status(200).end();
    });

    app.use(router);

    const query = "string=any@mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z";
    const response = await superRequest(app).get(`/query?${query}`);

    validateSuccess(response);
    expect(requestQuery).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to parse params url", async () => {
    let requestParams;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.get("/params/:string/:integer/:float/:boolean/:date", (request: Request, response: Response) => {
      requestParams = request.params;
      response.status(200).end();
    });

    app.use(router);

    const response = await superRequest(app).get("/params/any@mail.com/123/1.56/true/2000-02-03T02:00:00.000Z");

    validateSuccess(response);
    expect(requestParams).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to parse the JSON body in the POST method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
      array: ["string", true, false, 123, 1.56, new Date("2000-02-03T02:00:00.000Z")],
      object: {
        key: "string",
      },
    };

    const response = await superRequest(app).post("/body-post", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should be able to parse the JSON body in the PUT method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.put("/body-put", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    };

    const response = await superRequest(app).put("/body-put", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should be able to parse the JSON body in the PATCH method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.patch("/body-patch", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    };

    const response = await superRequest(app).patch("/body-patch", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should be able to parse the urlencoded body in the POST method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const urlencoded = "string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z";

    const response = await superRequest(app).post("/body-post", urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to parse the urlencoded body in the PUT method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.put("/body-put", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const urlencoded = "string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z";

    const response = await superRequest(app).put("/body-put", urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to parse the urlencoded body in the PATCH method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.patch("/body-patch", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const urlencoded = "string=any%40mail.com&integer=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z";

    const response = await superRequest(app).patch("/body-patch", urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to parse the form data body in the POST method", async () => {
    let requestBody: any;
    let requestFiles: any;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      requestFiles = request.files;
      response.status(200).end();
    });

    app.use(router);

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

    const response = await superRequest(app).post("/body-post", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

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

  it("Should be able to parse the form data body in the PUT method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.put("/body-put", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = new FormData();
    data.append("string", "any@mail.com");
    data.append("integer", String(123));
    data.append("float", String(1.56));
    data.append("boolean", String(true));
    data.append("date", new Date("2000-02-03T02:00:00.000Z").toISOString());

    const response = await superRequest(app).put("/body-put", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to parse the form data body in the PATCH method", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.patch("/body-patch", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = new FormData();
    data.append("string", "any@mail.com");
    data.append("integer", String(123));
    data.append("float", String(1.56));
    data.append("boolean", String(true));
    data.append("date", new Date("2000-02-03T02:00:00.000Z").toISOString());

    const response = await superRequest(app).patch("/body-patch", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({
      string: "any@mail.com",
      integer: "123",
      float: "1.56",
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    });

    app.close();
  });

  it("Should be able to use a string body in the POST, PUT, or PATCH method when not providing a content type supported by the data analysis module", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    };

    const response = await superRequest(app).post("/body-post", data, {
      headers: { "Content-Type": "text/plain" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(JSON.stringify(data));

    app.close();
  });

  it("Should be able to parse a string and parse it if there is SQL when the content type is JSON", async () => {
    let requestBody;

    const app = App();
    app.use(parseData({ escapeSQL: true }));
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "SELECT * FROM USER;",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({ sql: "'SELECT * FROM USER;'" });

    app.close();
  });

  it("Should be able to parse a string and parse it if there is SQL when the content type is urlencoded", async () => {
    let requestBody;

    const app = App();
    app.use(parseData({ escapeSQL: true }));
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const urlencoded = "sql=SELECT * FROM USER;";

    const response = await superRequest(app).post("/body-post", urlencoded, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({ sql: "'SELECT * FROM USER;'" });

    app.close();
  });

  it("Should be able to parse a string and parse it if there is SQL when the content type is form data", async () => {
    let requestBody;

    const app = App();
    app.use(parseData({ escapeSQL: true }));
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = new FormData();
    data.append("sql", "SELECT * FROM USER;");

    const response = await superRequest(app).post("/body-post", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual({ sql: "'SELECT * FROM USER;'" });

    app.close();
  });

  it("Should be able to parse a string and parse it if there is SQL with others content types", async () => {
    let requestBody;

    const app = App();
    app.use(parseData({ escapeSQL: true }));
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = "SELECT * FROM USER;";

    const response = await superRequest(app).post("/body-post", data, {
      headers: { "Content-Type": "text/plain" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual("'SELECT * FROM USER;'");

    app.close();
  });

  it("Return bad request if invalid request data", async () => {
    const app = App();
    app.use(parseData());
    const router = Router();

    router.post("/body-post", (_request: Request, response: Response) => {
      response.status(200).end();
    });

    app.use(router);
    const data = "Hello World!";

    await superRequest(app)
      .post("/body-post", data, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(400);
        expect(error.response.statusMessage).toEqual("Bad Request");
        expect(Object.keys(error.response.headers).length).toEqual(6);
        expect(isUUID(error.response.headers["request-id"])).toBeTruthy();
        expect(error.response.headers["access-control-allow-origin"]).toEqual("*");
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(isString(error.response.headers.date)).toBeTruthy();
        expect(error.response.headers.connection).toEqual("close");
        expect(error.response.headers["content-length"]).toEqual("20");
        expect(error.response.data).toEqual("Invalid Request Data");
      });

    app.close();
  });

  it("Should be able to return undefined body if request body is empty and content type is multipart/form-data", async () => {
    let requestBody;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.post("/body-post", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    await superRequest(app)
      .post("/body-post", "", {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(400);
        expect(error.response.data).toEqual("Invalid Request Data");
      });
    expect(requestBody).toEqual(undefined);

    app.close();
  });

  it("Should be able to return string json body if all config parse data is false", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        urlencoded: false,
        params: false,
        query: false,
        json: false,
        formData: false,
        escapeSQL: false,
      }),
    );
    const router = Router();

    router.post("/", (request: Request, response: Response) => {
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
      array: ["string", true, false, 123, 1.56, new Date("2000-02-03T02:00:00.000Z")],
      object: {
        key: "string",
      },
    };

    const response = await superRequest(app).post("/", data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(JSON.stringify(data));

    app.close();
  });

  it("Should be able to parse params and query url", async () => {
    let requestParams;
    let requestQuery;

    const app = App();
    app.use(parseData());
    const router = Router();

    router.get("/parse/:param1/:param2", (request: Request, response: Response) => {
      requestQuery = request.query;
      requestParams = request.params;
      response.status(200).end();
    });

    app.use(router);

    const path = "/parse/value1/value2?query1=example@mail.com&query2=123";
    const response = await superRequest(app).get(path);

    validateSuccess(response);
    expect(requestParams).toEqual({
      param1: "value1",
      param2: "value2",
    });
    expect(requestQuery).toEqual({
      query1: "example@mail.com",
      query2: "123",
    });

    app.close();
  });
});
