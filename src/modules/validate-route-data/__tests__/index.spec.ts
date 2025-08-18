import { App, Request, Response, schema, superRequest, validateRouteData } from "../../../index";

describe("Validate Route Data - end to end testing using super request", () => {
  const schemaData = schema().object({
    headers: schema().object({
      authorization: schema()
        .string()
        .notRequired()
        .custom((ctx) => {
          if (ctx.value) {
            ctx.success("success");
          } else {
            ctx.success(ctx.value);
          }
        }),
    }),
    params: schema().object({
      string: schema().string().email(),
      integer: schema().string().parseTo().number().integer(),
    }),
    query: schema().object({
      float: schema().string().parseTo().number().float(),
      boolean: schema().boolean(),
      date: schema().date(),
    }),
    files: schema().array(schema().any()).notRequired(),
    body: schema().object({
      string: schema().string().email(),
      integer: schema().number().integer(),
      float: schema().number().float(),
      boolean: schema().boolean(),
      date: schema().date(),
    }),
  });

  it("Should validate headers and successfully pass through the middleware", async () => {
    const app = App();
    app.parseData();

    app.post("/params/:string/:integer/query", validateRouteData(schemaData), (request: Request, response: Response) => {
      const requestData = {
        headers: request.headers,
        query: request.query,
        params: request.params,
        files: request?.files,
        body: request.body,
      };

      expect(requestData).toEqual({
        headers: {
          authorization: "success",
          "content-type": "application/json",
          "x-custom-header": "customValue",
        },
        params: {
          string: "any@mail.com",
          integer: 123,
        },
        query: {
          float: 1.56,
          boolean: true,
          date: new Date("2000-02-03T02:00:00.000Z"),
        },
        body: {
          string: "any@mail.com",
          integer: 123,
          float: 1.56,
          boolean: true,
          date: new Date("2000-02-03T02:00:00.000Z"),
        },
      });
      response.status(200).end("Success!");
    });

    const path = "params/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z";
    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    };

    await superRequest(app)
      .post(`/${path}`, data, {
        headers: {
          authorization: "Bearer token123",
          "x-custom-header": "customValue",
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("Success!");
      });
  });

  it("Should validate headers and return bad request when headers are invalid", async () => {
    const app = App();
    app.parseData();

    app.post("/params/:string/:integer/query", validateRouteData(schemaData), (request: Request, response: Response) => {
      response.status(200).json({
        query: request.query,
        params: request.params,
        headers: request.headers,
        files: request?.files,
        body: request.body,
      });
    });

    const path = "params/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z";
    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    };

    await superRequest(app)
      .post(`/${path}`, data, {
        headers: {
          authorization: "1234",
          "x-custom-header": "5678",
        },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(400);
        expect(error.response.data).toEqual("authorization must be a string type!");
      });
  });

  it("Should validate headers and return custom bad request response", async () => {
    const app = App();
    app.parseData();

    const onError = async (error: string, response: Response) => {
      response.status(400).json({ message: `Custom: ${error}` });
    };

    app.post(
      "/params/:string/:integer/query",
      validateRouteData(schemaData, onError),
      (request: Request, response: Response) => {
        response.status(200).json({
          query: request.query,
          params: request.params,
          headers: request.headers,
          files: request?.files,
          body: request.body,
        });
      },
    );

    const path = "params/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z";
    const data = {
      string: "any@mail.com",
      integer: 123,
      float: 1.56,
      boolean: true,
      date: new Date("2000-02-03T02:00:00.000Z"),
    };

    await superRequest(app)
      .post(`/${path}`, data, {
        headers: {
          authorization: "1234",
        },
      })
      .catch((error) => {
        expect(error.response.statusCode).toEqual(400);
        expect(error.response.data).toEqual({ message: "Custom: authorization must be a string type!" });
      });
  });
});
