import { Router } from "..";
import { App } from "../../app";
import { superRequest } from "../../super-request";
import { Controller, ErrorHandlerMiddleware, Middleware, NextFunction, Request, Response } from "../../types";
import { isString, isUUID } from "../../utils";
import { controllerAdapter, errorHandleAdapter, middlewareAdapter } from "../helpers/adapters";

describe("Router", () => {
  it("Should be able to call the route in the GET method", async () => {
    const app = App();
    const router = Router();

    router.get("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("GET ok");
    });

    app.use(router);

    await superRequest(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.headers).length).toEqual(5);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers.connection).toEqual("close");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers["content-length"]).toEqual("6");
        expect(response.data).toEqual("GET ok");
      });

    app.close();
  });

  it("Should be able to call the route in the HEAD method", async () => {
    const app = App();
    const router = Router();

    router.head("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(204).end("HEAD ok");
    });

    app.use(router);

    await superRequest(app)
      .head("/")
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        expect(Object.keys(response.headers).length).toEqual(4);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers.connection).toEqual("close");
        expect(response.data).toEqual("");
      });

    app.close();
  });

  it("Should be able to call the route in the POST method", async () => {
    const app = App();
    const router = Router();

    router.post("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("POST ok");
    });

    app.use(router);

    await superRequest(app)
      .post("/")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.headers).length).toEqual(5);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers.connection).toEqual("close");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers["content-length"]).toEqual("7");
        expect(response.data).toEqual("POST ok");
      });

    app.close();
  });

  it("Should be able to call the route in the PUT method", async () => {
    const app = App();
    const router = Router();

    router.put("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("PUT ok");
    });

    app.use(router);

    await superRequest(app)
      .put("/")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.headers).length).toEqual(5);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers.connection).toEqual("close");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers["content-length"]).toEqual("6");
        expect(response.data).toEqual("PUT ok");
      });

    app.close();
  });

  it("Should be able to call the route in the PATCH method", async () => {
    const app = App();
    const router = Router();

    router.patch("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("PATCH ok");
    });

    app.use(router);

    await superRequest(app)
      .patch("/")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.headers).length).toEqual(5);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers.connection).toEqual("close");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers["content-length"]).toEqual("8");
        expect(response.data).toEqual("PATCH ok");
      });

    app.close();
  });

  it("Should be able to call the route in the DELETE method", async () => {
    const app = App();
    const router = Router();

    router.delete("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("DELETE ok");
    });

    app.use(router);

    await superRequest(app)
      .delete("/")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.headers).length).toEqual(5);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers.connection).toEqual("close");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers["content-length"]).toEqual("9");
        expect(response.data).toEqual("DELETE ok");
      });

    app.close();
  });

  it("Should be able to call the route in the OPTIONS method", async () => {
    const app = App();
    const router = Router();

    router.options("/", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("");
    });

    app.use(router);

    await superRequest(app)
      .options("/")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.headers).length).toEqual(5);
        expect(isUUID(response.headers["request-id"])).toBeTruthy();
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers.connection).toEqual("close");
        expect(isString(response.headers.date)).toBeTruthy();
        expect(response.headers["content-length"]).toEqual("0");
        expect(response.data).toEqual("");
      });

    app.close();
  });

  it("should throw an error when duplicate GET route is registered via multiple routers", async () => {
    const app = App();
    const router1 = Router();
    const router2 = Router();

    router1.get("/get-route", (_req: Request, res: Response) => res.status(200).end());
    router2.get("/get-route", (_req: Request, res: Response) => res.status(200).end());

    app.use(router1);
    app.use(router2);

    await expect((app as any)._reqWithoutServer({ url: "/get-route" } as any, { _ended: true } as any)).rejects.toThrow(
      "vkrun-app: route duplicated for GET /get-route",
    );
  });

  it("should throw an error when GET route is duplicated between router and app", async () => {
    const app = App();
    const router1 = Router();
    const router2 = Router();

    router1.get("/get-route", (_req: Request, res: Response) => res.status(200).end());
    router2.get("/get-route-b", (_req: Request, res: Response) => res.status(200).end());

    app.use(router1);
    app.use(router2);

    app.get("/get-route", (_req: Request, res: Response) => res.status(200).end());

    await expect((app as any)._reqWithoutServer({ url: "/get-route" } as any, { _ended: true } as any)).rejects.toThrow(
      "vkrun-app: route duplicated for GET /get-route",
    );
  });

  it("Return not found if the route does not exist", async () => {
    const app = App();
    const router = Router();
    app.use(router);

    await superRequest(app)
      .get("/")
      .catch((error) => {
        expect(error.response.statusCode).toEqual(404);
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(error.response.headers["access-control-allow-origin"]).toEqual("*");
        expect(error.response.data).toEqual("Not Found");
      });

    app.close();
  });

  it("Return no content if the route has no handler", async () => {
    const app = App();
    const router = Router();
    router.get("/route-without-handler");
    app.use(router);

    await superRequest(app)
      .get("/route-without-handler")
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.headers["access-control-allow-origin"]).toEqual("*");
        expect(response.data).toEqual("");
      });

    app.close();
  });

  it("Should be able to manipulate multiple handlers with method handle", async () => {
    class ExampleMiddleware implements Middleware {
      public handle(_request: Request, _response: Response, next: NextFunction): void {
        next();
      }
    }

    class ExampleController implements Controller {
      public handle(_request: Request, response: Response): void {
        response.setHeader("Content-Type", "text/plain");
        response.status(200).end("Return controller");
      }
    }

    const app = App();
    const router = Router();
    router.get("/multiple-handlers", middlewareAdapter(new ExampleMiddleware()), controllerAdapter(new ExampleController()));
    app.use(router);

    await superRequest(app)
      .get("/multiple-handlers")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("Return controller");
      });

    app.close();
  });

  it("Should be able to manipulate multiple handler functions", async () => {
    const exampleMiddleware = (_request: Request, _response: Response, next: NextFunction): void => {
      next();
    };

    const exampleController = (_request: Request, response: Response): void => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("Return controller");
    };

    const app = App();
    const router = Router();
    router.get("/multiple-handlers", exampleMiddleware, exampleController);
    app.use(router);

    await superRequest(app)
      .get("/multiple-handlers")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("Return controller");
      });

    app.close();
  });

  it("throw new Error when using invalid middleware with error handler with method handle", async () => {
    const invalidMiddleware = (): any => {};

    class ErrorMiddleware implements ErrorHandlerMiddleware {
      public handle(error: any, _request: Request, response: Response): void {
        response.setHeader("Content-Type", "text/plain");
        response.status(500).end(error.message);
      }
    }

    class ExampleController implements Controller {
      public handle(_request: Request, response: Response): void {
        response.setHeader("Content-Type", "text/plain");
        response.status(200).end("Return controller");
      }
    }

    const app = App();
    app.use(invalidMiddleware);
    app.error(errorHandleAdapter(new ErrorMiddleware()));
    const router = Router();
    router.get("/", controllerAdapter(new ExampleController()));
    app.use(router);

    await superRequest(app)
      .get("/")
      .catch((error) => {
        expect(error.response.statusCode).toEqual(500);
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(error.response.data).toEqual("vkrun-router: method use received invalid middleware.");
      });

    app.close();
  });

  it("throw new Error when using invalid middleware with error handler function", async () => {
    const invalidMiddleware = (): any => {};

    const errorMiddleware = (error: any, _request: Request, response: Response): void => {
      response.setHeader("Content-Type", "text/plain");
      response.status(500).end(error.message);
    };

    const exampleController = (_request: Request, response: Response): void => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("Return controller");
    };

    const app = App();
    app.use(invalidMiddleware);
    app.error(errorMiddleware);
    const router = Router();
    router.get("/", exampleController);
    app.use(router);

    await superRequest(app)
      .get("/")
      .catch((error) => {
        expect(error.response.statusCode).toEqual(500);
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(error.response.data).toEqual("vkrun-router: method use received invalid middleware.");
      });

    app.close();
  });

  it("Should be able to use multiple Router instances", async () => {
    const app = App();
    const routerA = Router();
    const routerB = Router();

    routerA.get("/get", (_request: Request, response: Response) => {
      response.status(200).send("GET ok");
    });

    routerB.post("/post", (_request: Request, response: Response) => {
      response.status(200).send("POST ok");
    });

    app.use(routerA);
    app.use(routerB);

    await superRequest(app)
      .get("/get")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("GET ok");
      });

    await superRequest(app)
      .post("/post")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("POST ok");
      });

    app.close();
  });

  it("Should be able to create routes directly from the App instance", async () => {
    const app = App();

    app.get("/get", (_request: Request, response: Response) => {
      response.status(200).send("GET ok");
    });

    app.post("/post", (_request: Request, response: Response) => {
      response.status(200).send("POST ok");
    });

    await superRequest(app)
      .get("/get")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("GET ok");
      });

    await superRequest(app)
      .post("/post")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("POST ok");
      });

    app.close();
  });

  it("Should be able to work with multiple router instances and routes created directly in the App", async () => {
    const app = App();
    const routerA = Router();
    const routerB = Router();

    routerA.get("/example-a", (_request: Request, response: Response) => {
      response.status(200).send("GET ok");
    });

    routerB.post("/example-b", (_request: Request, response: Response) => {
      response.status(200).send("POST ok");
    });

    app.use(routerA);
    app.use(routerB);

    app.get("/example-c", (_request: Request, response: Response) => {
      response.status(200).send("GET ok");
    });

    app.post("/example-d", (_request: Request, response: Response) => {
      response.status(200).send("POST ok");
    });

    await superRequest(app)
      .get("/example-a")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("GET ok");
      });

    await superRequest(app)
      .post("/example-b")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("POST ok");
      });

    await superRequest(app)
      .get("/example-c")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("GET ok");
      });

    await superRequest(app)
      .post("/example-d")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual("POST ok");
      });

    app.close();
  });

  it("Should handle route with * in GET method", async () => {
    const app = App();
    const router = Router();

    // Define a route with a wildcard
    router.get("/wildcard/*", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("GET wildcard ok");
    });

    app.use(router);

    await superRequest(app)
      .get("/wildcard/test")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("GET wildcard ok");
      });

    await superRequest(app)
      .get("/wildcard/another/test")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("GET wildcard ok");
      });

    app.close();
  });

  it("Should handle route with * in POST method", async () => {
    const app = App();
    const router = Router();

    // Define a route with a wildcard for POST requests
    router.post("/api/v1/*", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("POST wildcard ok");
    });

    app.use(router);

    await superRequest(app)
      .post("/api/v1/test")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("POST wildcard ok");
      });

    await superRequest(app)
      .post("/api/v1/another/route")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("POST wildcard ok");
      });

    app.close();
  });

  it("Should handle multiple levels of * in route", async () => {
    const app = App();
    const router = Router();

    // Define a route with multiple wildcard levels
    router.get("/products/*/details/*", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("GET multi-wildcard ok");
    });

    app.use(router);

    await superRequest(app)
      .get("/products/123/details/456")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("GET multi-wildcard ok");
      });

    await superRequest(app)
      .get("/products/abc/details/def")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("GET multi-wildcard ok");
      });

    app.close();
  });

  it("Should handle route with * in DELETE method", async () => {
    const app = App();
    const router = Router();

    // Define a route with a wildcard for DELETE requests
    router.delete("/remove/*", (_request: Request, response: Response) => {
      response.setHeader("Content-Type", "text/plain");
      response.status(200).end("DELETE wildcard ok");
    });

    app.use(router);

    await superRequest(app)
      .delete("/remove/123")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("DELETE wildcard ok");
      });

    await superRequest(app)
      .delete("/remove/some/path")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/plain");
        expect(response.data).toEqual("DELETE wildcard ok");
      });

    app.close();
  });

  it("Should send an HTML response using the html method", async () => {
    const app = App();
    const router = Router();

    router.get("/html", (_request: Request, response: Response) => {
      const name = "World";
      response.html`
        <html>
          <head><title>Test</title></head>
          <body>
            <h1>Hello, ${name}!</h1>
          </body>
        </html>
      `;
    });

    app.use(router);

    await superRequest(app)
      .get("/html")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.headers["content-type"]).toEqual("text/html");
        expect(response.data).toEqual(
          "<html>\n          <head><title>Test</title></head>\n          <body>\n            <h1>Hello, World!</h1>\n          </body>\n        </html>",
        );
      });

    app.close();
  });

  it("Should redirect to an external URL and retrieve the response body using the GET method", async () => {
    const app = App();
    const router = Router();

    router.get("/redirect", (_request: Request, response: Response) => {
      response.redirect("https://jsonplaceholder.typicode.com/posts/1");
    });

    app.use(router);

    await superRequest(app)
      .get("/redirect")
      .then((response) => {
        // Status code from the external request
        expect(response.statusCode).toEqual(200);
        // Content-Type from the external request
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        // Verifies response body from the external request
        expect(response.data).toEqual({
          userId: 1,
          id: 1,
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        });
      });

    app.close();
  });

  it("Should redirect to an external URL using the redirect method with POST protocol", async () => {
    const app = App();
    app.parseData();
    const router = Router();

    router.post("/redirect", (_request: Request, response: Response) => {
      response.redirect("https://jsonplaceholder.typicode.com/posts");
    });

    app.use(router);

    const data = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    await superRequest(app)
      .post("/redirect", data, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
      .then((response) => {
        // Status code from the external request
        expect(response.statusCode).toEqual(201);
        // Content-Type from the external request
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        // Verifies response body from the external request
        expect(response.data).toEqual({
          title: "foo",
          body: "bar",
          userId: 1,
          id: 101,
        });
      });

    app.close();
  });

  it("Should redirect to a local server URL using the POST method and retrieve the response body", async () => {
    // App A localhost
    const appA = App();

    appA.post("/redirect", (request: Request, response: Response) => {
      expect(request.headers.authorization).toEqual("123");
      response.status(200).json({
        message: "Hello World!",
      });
    });

    appA.server().listen(3100);

    // App B test redirect to localhost
    const appB = App();
    appB.parseData();

    appB.post("/redirect", (_request: Request, response: Response) => {
      response.redirect("http://localhost:3100/redirect");
    });

    await superRequest(appB)
      .post(
        "/redirect",
        {},
        {
          headers: { Authorization: "123" },
        },
      )
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual({
          message: "Hello World!",
        });
      });

    appA.close();
    appB.close();
  });

  it("return error message with error handler using asynchronous handlers", async () => {
    class ErrorMiddleware implements ErrorHandlerMiddleware {
      public handle(error: any, _request: Request, response: Response): void {
        response.setHeader("Content-Type", "text/plain");
        response.status(500).end(error.message);
      }
    }

    class ExampleService {
      public async execute(): Promise<void> {
        throw new Error("Any error message");
      }
    }

    class ExampleController implements Controller {
      public async handle(_request: Request, response: Response): Promise<void> {
        const service = new ExampleService();
        await service.execute();
        response.setHeader("Content-Type", "text/plain");
        response.status(200).end("Return controller");
      }
    }

    const app = App();
    app.error(errorHandleAdapter(new ErrorMiddleware()));
    const router = Router();
    router.get("/", controllerAdapter(new ExampleController()));
    app.use(router);

    await superRequest(app)
      .get("/")
      .catch((error) => {
        expect(error.response.statusCode).toEqual(500);
        expect(error.response.headers["content-type"]).toEqual("text/plain");
        expect(error.response.data).toEqual("Any error message");
      });

    app.close();
  });
});
