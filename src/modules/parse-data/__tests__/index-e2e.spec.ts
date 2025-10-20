import { writeFileSync, unlinkSync, readFileSync, existsSync, join } from "../../runtime";
import FormData from "form-data";
import zlib from "zlib";
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
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
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
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
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
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
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
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
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

  it("Should escape simple tautology injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "1' OR '1'='1",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({ sql: "'1'' OR ''1''=''1'" });

    app.close();
  });

  it("Should escape UNION SELECT injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "UNION SELECT username, password FROM users --",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'UNION SELECT username, password FROM users --'",
    });

    app.close();
  });

  it("Should escape DROP TABLE injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "DROP TABLE users; --",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'DROP TABLE users; --'",
    });

    app.close();
  });

  it("Should escape stacked query injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "SELECT * FROM users; DROP TABLE logs;",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'SELECT * FROM users; DROP TABLE logs;'",
    });

    app.close();
  });

  it("Should escape comment-based injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "admin' --",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'admin'' --'",
    });

    app.close();
  });

  it("Should escape boolean-based blind injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "admin' AND '1'='1",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'admin'' AND ''1''=''1'",
    });

    app.close();
  });

  it("Should escape time-based injection with SLEEP", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "admin' OR IF(1=1, SLEEP(5), 0)--",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'admin'' OR IF(1=1, SLEEP(5), 0)--'",
    });

    app.close();
  });

  it("Should escape advanced UNION SELECT injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "' UNION SELECT null, CONCAT(username, ':', password) FROM users --",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "''' UNION SELECT null, CONCAT(username, '':'', password) FROM users --'",
    });

    app.close();
  });

  it("Should escape encoded SQL injection (hex)", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "SELECT * FROM users WHERE name = 0x61646d696e", // "admin" em hex
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'SELECT * FROM users WHERE name = 0x61646d696e'",
    });

    app.close();
  });

  it("Should escape MSSQL time-based injection", async () => {
    let requestBody;

    const app = App();
    app.use(
      parseData({
        security: {
          escapeSQL: true,
        },
      }),
    );
    const router = Router();

    router.post("/body-post", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const data = {
      sql: "admin'; WAITFOR DELAY '00:00:05'--",
    };

    const response = await superRequest(app).post("/body-post", data);

    validateSuccess(response);
    expect(requestBody).toEqual({
      sql: "'admin''; WAITFOR DELAY ''00:00:05''--'",
    });

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
        parse: {
          urlencoded: false,
          params: false,
          query: false,
          json: false,
          formData: false,
        },
        security: {
          escapeSQL: false,
        },
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

  it("Should be able to parse params, query, and JSON body using route-level parseData", async () => {
    let requestParams;
    let requestQuery;
    let requestBody;

    const app = App();
    const router = Router();

    router.post("/parse/:param1/:param2", parseData(), (request: Request, response: Response) => {
      requestQuery = request.query;
      requestParams = request.params;
      requestBody = request.body;
      response.status(200).end();
    });

    app.use(router);

    const path = "/parse/value1/value2?query1=example@mail.com&query2=123";

    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
      nested: { key: "value" },
    };

    const response = await superRequest(app).post(path, data, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);

    expect(requestParams).toEqual({
      param1: "value1",
      param2: "value2",
    });

    expect(requestQuery).toEqual({
      query1: "example@mail.com",
      query2: "123",
    });

    expect(requestBody).toEqual(data);

    app.close();
  });

  it("Should be able to read rawBody when enabled", async () => {
    let requestRawBody: any;

    const app = App();
    const router = Router();

    router.post(
      "/route",
      parseData({
        body: {
          raw: true,
        },
      }),
      (request: Request, response: Response) => {
        requestRawBody = request.rawBody as Buffer;
        response.status(200).end();
      },
    );

    app.use(router);

    const jsonBody = { string: "any@mail.com" };
    const expectedRaw = JSON.stringify(jsonBody);

    const response = await superRequest(app).post("/route", jsonBody, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);

    expect(requestRawBody?.toString("utf-8")).toEqual(expectedRaw);

    app.close();
  });

  it("Should reject requests exceeding bodyLimit with 413 Payload Too Large", async () => {
    const app = App();
    app.use(
      parseData({
        body: {
          limit: 1024,
        },
      }),
    ); // 1KB = 1024 bytes
    const router = Router();

    let requestBody;

    router.post("/large-body", (req: Request, res: Response) => {
      requestBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const bigData = {
      content: "X".repeat(5 * 1024), // 5KB
    };

    await superRequest(app)
      .post("/large-body", bigData, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(413);
        expect(error.response.statusMessage).toEqual("Payload Too Large");
        expect(error.response.data).toEqual("Payload Too Large");
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(error.response.headers["access-control-allow-origin"]).toEqual("*");
        expect(error.response.headers.connection).toEqual("close");
        expect(isString(error.response.headers.date)).toBeTruthy();
      });

    expect(requestBody).toBeUndefined();

    app.close();
  });

  it("Should skip body parsing when Content-Type does not match 'type' filter", async () => {
    let requestBody;

    const app = App();
    const router = Router();

    router.post(
      "/skip-type",
      parseData({
        body: {
          type: "application/xml",
        },
      }),
      (req: Request, res: Response) => {
        requestBody = req.body;
        res.status(200).end();
      },
    );

    app.use(router);

    const jsonData = { message: "should not be parsed" };

    const response = await superRequest(app).post("/skip-type", jsonData, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toBeUndefined();

    app.close();
  });

  it("Should reject request when verify callback throws error", async () => {
    const app = App();
    const router = Router();

    const verifyMock = jest.fn(() => {
      throw new Error("Invalid signature");
    });

    router.post(
      "/verify",
      parseData({
        security: {
          verify: verifyMock,
        },
      }),
      (_req: Request, _res: Response) => {
        throw new Error("Should not reach here");
      },
    );

    app.use(router);

    const jsonBody = { msg: "hello" };

    await superRequest(app)
      .post("/verify", jsonBody, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(400);
        expect(error.response.statusMessage).toEqual("Bad Request");
        expect(error.response.data).toEqual("Invalid Request Verification");
        expect(error.response.headers["content-type"]).toEqual("text/plain");
      });

    expect(verifyMock).toHaveBeenCalled();

    app.close();
  });

  it("Should accept request when verify callback succeeds", async () => {
    let requestBody;
    const app = App();
    const router = Router();

    const verifyMock = jest.fn((_req, rawBuffer) => {
      expect(Buffer.isBuffer(rawBuffer)).toBeTruthy();
    });

    router.post(
      "/verify-success",
      parseData({
        security: {
          verify: verifyMock,
        },
      }),
      (req: Request, res: Response) => {
        requestBody = req.body;
        res.status(200).end();
      },
    );

    app.use(router);

    const jsonBody = { msg: "ok" };
    const response = await superRequest(app).post("/verify-success", jsonBody, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(jsonBody);
    expect(verifyMock).toHaveBeenCalledTimes(1);

    app.close();
  });

  it("Should reject compressed request when inflate is disabled", async () => {
    const app = App();
    const router = Router();

    router.post(
      "/no-inflate",
      parseData({
        body: {
          inflate: false,
        },
      }),
      (_req: Request, _res: Response) => {
        throw new Error("Should not reach handler");
      },
    );

    app.use(router);

    const jsonBody = { msg: "compressed" };
    await superRequest(app)
      .post("/no-inflate", jsonBody, {
        headers: {
          "Content-Type": "application/json",
          "Content-Encoding": "gzip",
        },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(415);
        expect(error.response.statusMessage).toEqual("Unsupported Media Type");
        expect(error.response.data).toEqual("Unsupported Content-Encoding");
        expect(error.response.headers["content-type"]).toEqual("text/plain");
      });

    app.close();
  });

  it("Should decompress gzip body when inflate=true (success case)", async () => {
    let requestBody;

    const app = App();
    const router = Router();

    router.post(
      "/inflate-success",
      parseData({
        body: {
          inflate: true,
        },
      }),
      (req: Request, res: Response) => {
        requestBody = req.body;
        res.status(200).end();
      },
    );

    app.use(router);

    const jsonBody = { msg: "Hello compressed world" };
    const compressed = zlib.gzipSync(JSON.stringify(jsonBody));

    const response = await superRequest(app).post("/inflate-success", compressed, {
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
      },
    });

    validateSuccess(response);
    expect(requestBody).toEqual(jsonBody);

    app.close();
  });

  it("Should reject invalid gzip body when inflate=true (failure case)", async () => {
    const app = App();
    const router = Router();

    router.post(
      "/inflate-fail",
      parseData({
        body: {
          inflate: true,
        },
      }),
      (_req: Request, _res: Response) => {
        throw new Error("Should not reach handler");
      },
    );

    app.use(router);

    const invalidBody = Buffer.from("not a real gzip stream");

    await superRequest(app)
      .post("/inflate-fail", invalidBody, {
        headers: {
          "Content-Type": "application/json",
          "Content-Encoding": "gzip",
        },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(400);
        expect(error.response.statusMessage).toEqual("Bad Request");
        expect(error.response.data).toEqual("Invalid Compressed Data");
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(error.response.headers["access-control-allow-origin"]).toEqual("*");
      });

    app.close();
  });

  it("Should ignore global parseData when route defines its own parseData instance (acts like raw)", async () => {
    let globalParsedBody: any = null;
    let localRawBody: any = null;

    const app = App();

    app.parseData();

    const router = Router();

    router.post(
      "/raw",
      parseData({
        body: {
          raw: true,
        },
      }),
      (req: Request, res: Response) => {
        localRawBody = req.rawBody?.toString("utf-8");
        res.status(200).end();
      },
    );

    router.post("/json", (req: Request, res: Response) => {
      globalParsedBody = req.body;
      res.status(200).end();
    });

    app.use(router);

    const jsonBody = { email: "test@domain.com" };
    const expectedRaw = JSON.stringify(jsonBody);

    const rawResponse = await superRequest(app).post("/raw", jsonBody, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(rawResponse);
    expect(localRawBody).toEqual(expectedRaw);

    const jsonResponse = await superRequest(app).post("/json", jsonBody, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(jsonResponse);
    expect(globalParsedBody).toEqual(jsonBody);

    expect(globalParsedBody).not.toEqual(localRawBody);

    app.close();
  });

  it("Should correctly respect 'type' filter and still parse query and params", async () => {
    let received = {
      body: undefined as any,
      query: undefined as any,
      params: undefined as any,
    };

    const app = App();
    const router = Router();

    router.post("/parse/:param1/:param2", parseData({ body: { type: "application/xml" } }), (req: Request, res: Response) => {
      received.body = req.body;
      received.query = req.query;
      received.params = req.params;
      res.status(200).end();
    });

    app.use(router);

    const jsonBody = { msg: "not parsed" };
    const path = "/parse/value1/value2?query1=abc&query2=123";

    const response = await superRequest(app).post(path, jsonBody, {
      headers: { "Content-Type": "application/json" },
    });

    validateSuccess(response);

    expect(received.body).toBeUndefined();

    expect(received.params).toEqual({
      param1: "value1",
      param2: "value2",
    });

    expect(received.query).toEqual({
      query1: "abc",
      query2: "123",
    });

    app.close();
  });

  describe("Parse Data - type filter advanced tests", () => {
    const validateSuccess = (response: any): void => {
      expect(response.statusCode).toEqual(200);
      expect(response.statusMessage).toEqual("OK");
    };

    it("Should correctly match when Content-Type has charset and matches the type string", async () => {
      let requestBody;

      const app = App();
      const router = Router();

      router.post(
        "/charset-json",
        parseData({
          body: { type: "application/json" },
        }),
        (req: Request, res: Response) => {
          requestBody = req.body;
          res.status(200).end();
        },
      );

      app.use(router);

      const json = { message: "ok" };
      const response = await superRequest(app).post("/charset-json", json, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

      validateSuccess(response);
      expect(requestBody).toEqual(json);

      app.close();
    });

    it("Should correctly match type using RegExp (e.g. /^text\\//)", async () => {
      let requestBody;

      const app = App();
      const router = Router();

      router.post(
        "/regex-type",
        parseData({
          body: { type: /^text\// },
        }),
        (req: Request, res: Response) => {
          requestBody = req.body;
          res.status(200).end();
        },
      );

      app.use(router);

      const plainText = "Hello from regex type!";
      const response = await superRequest(app).post("/regex-type", plainText, {
        headers: { "Content-Type": "text/plain" },
      });

      validateSuccess(response);
      expect(requestBody).toEqual(plainText);

      app.close();
    });

    it("Should skip body parsing for regex type when Content-Type does not match", async () => {
      let requestBody;

      const app = App();
      const router = Router();

      router.post(
        "/regex-skip",
        parseData({
          body: { type: /^text\// },
        }),
        (req: Request, res: Response) => {
          requestBody = req.body;
          res.status(200).end();
        },
      );

      app.use(router);

      const jsonBody = { message: "not parsed" };
      const response = await superRequest(app).post("/regex-skip", jsonBody, {
        headers: { "Content-Type": "application/json" },
      });

      validateSuccess(response);
      expect(requestBody).toBeUndefined();

      app.close();
    });

    it("Should still parse query and params even if Content-Type does not match type filter", async () => {
      let received: any = { body: null, query: null, params: null };

      const app = App();
      const router = Router();

      router.post(
        "/test/:param",
        parseData({
          body: { type: "application/xml" },
        }),
        (req: Request, res: Response) => {
          received.body = req.body;
          received.query = req.query;
          received.params = req.params;
          res.status(200).end();
        },
      );

      app.use(router);

      const path = "/test/value1?search=ok";
      const jsonBody = { msg: "json ignored" };

      const response = await superRequest(app).post(path, jsonBody, {
        headers: { "Content-Type": "application/json" },
      });

      validateSuccess(response);
      expect(received.body).toBeUndefined();
      expect(received.params).toEqual({ param: "value1" });
      expect(received.query).toEqual({ search: "ok" });

      app.close();
    });

    it("Should handle multipart/form-data when type explicitly matches", async () => {
      let requestBody: any;
      let requestFiles: any;

      const app = App();
      const router = Router();

      router.post(
        "/multipart-ok",
        parseData({
          body: { type: "multipart/form-data" },
        }),
        (req: Request, res: Response) => {
          requestBody = req.body;
          requestFiles = req.files;
          res.status(200).end();
        },
      );

      app.use(router);

      const form = new FormData();
      form.append("username", "john");
      form.append("file", Buffer.from("test-file"), "test.txt");

      const response = await superRequest(app).post("/multipart-ok", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      validateSuccess(response);
      expect(requestBody).toEqual({ username: "john" });
      expect(requestFiles?.[0].filename).toEqual("test.txt");

      app.close();
    });

    it("Should skip multipart/form-data when type does not match", async () => {
      let requestBody;
      let requestFiles;

      const app = App();
      const router = Router();

      router.post(
        "/multipart-skip",
        parseData({
          body: { type: "application/json" },
        }),
        (req: Request, res: Response) => {
          requestBody = req.body;
          requestFiles = req.files;
          res.status(200).end();
        },
      );

      app.use(router);

      const form = new FormData();
      form.append("username", "john");
      form.append("file", Buffer.from("abc"), "test.txt");

      const response = await superRequest(app).post("/multipart-skip", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      validateSuccess(response);
      expect(requestBody).toBeUndefined();
      expect(requestFiles).toBeUndefined();

      app.close();
    });

    it("Should accept wildcard type via RegExp and parse any text-based body", async () => {
      let requestBody;

      const app = App();
      const router = Router();

      router.post(
        "/wildcard",
        parseData({
          body: { type: /^.*/ },
        }),
        (req: Request, res: Response) => {
          requestBody = req.body;
          res.status(200).end();
        },
      );

      app.use(router);

      const xmlData = "<xml><user>john</user></xml>";
      const response = await superRequest(app).post("/wildcard", xmlData, {
        headers: { "Content-Type": "application/xml" },
      });

      validateSuccess(response);
      expect(requestBody).toEqual(xmlData);

      app.close();
    });
  });
});
