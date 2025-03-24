import { httpStatus } from "../http-status-handlers";

describe("HTTP status handlers", () => {
  it("Should return status code and injected content", async () => {
    expect(httpStatus.continue("CONTINUE")).toEqual({ statusCode: 100, content: "CONTINUE" });
    expect(httpStatus.switchingProtocols("SWITCHING_PROTOCOLS")).toEqual({ statusCode: 101, content: "SWITCHING_PROTOCOLS" });
    expect(httpStatus.ok("OK")).toEqual({ statusCode: 200, content: "OK" });
    expect(httpStatus.created("CREATED")).toEqual({ statusCode: 201, content: "CREATED" });
    expect(httpStatus.accepted("ACCEPTED")).toEqual({ statusCode: 202, content: "ACCEPTED" });
    expect(httpStatus.nonAuthoritativeInformation("NON_AUTHORITATIVE_INFORMATION")).toEqual({
      statusCode: 203,
      content: "NON_AUTHORITATIVE_INFORMATION",
    });
    expect(httpStatus.noContent("NO_CONTENT")).toEqual({ statusCode: 204, content: "NO_CONTENT" });
    expect(httpStatus.resetContent("RESET_CONTENT")).toEqual({ statusCode: 205, content: "RESET_CONTENT" });
    expect(httpStatus.partialContent("PARTIAL_CONTENT")).toEqual({ statusCode: 206, content: "PARTIAL_CONTENT" });
    expect(httpStatus.multipleChoices("MULTIPLE_CHOICES")).toEqual({ statusCode: 300, content: "MULTIPLE_CHOICES" });
    expect(httpStatus.movedPermanently("MOVED_PERMANENTLY")).toEqual({ statusCode: 301, content: "MOVED_PERMANENTLY" });
    expect(httpStatus.movedTemporarily("MOVED_TEMPORARILY")).toEqual({ statusCode: 302, content: "MOVED_TEMPORARILY" });
    expect(httpStatus.seeOther("SEE_OTHER")).toEqual({ statusCode: 303, content: "SEE_OTHER" });
    expect(httpStatus.notModified("NOT_MODIFIED")).toEqual({ statusCode: 304, content: "NOT_MODIFIED" });
    expect(httpStatus.useProxy("USE_PROXY")).toEqual({ statusCode: 305, content: "USE_PROXY" });
    expect(httpStatus.temporaryRedirect("TEMPORARY_REDIRECT")).toEqual({ statusCode: 307, content: "TEMPORARY_REDIRECT" });
    expect(httpStatus.permanentRedirect("PERMANENT_REDIRECT")).toEqual({ statusCode: 308, content: "PERMANENT_REDIRECT" });
    expect(httpStatus.badRequest("BAD_REQUEST")).toEqual({ statusCode: 400, content: "BAD_REQUEST" });
    expect(httpStatus.unauthorized("UNAUTHORIZED")).toEqual({ statusCode: 401, content: "UNAUTHORIZED" });
    expect(httpStatus.paymentRequired("PAYMENT_REQUIRED")).toEqual({ statusCode: 402, content: "PAYMENT_REQUIRED" });
    expect(httpStatus.forbidden("FORBIDDEN")).toEqual({ statusCode: 403, content: "FORBIDDEN" });
    expect(httpStatus.notFound("NOT_FOUND")).toEqual({ statusCode: 404, content: "NOT_FOUND" });
    expect(httpStatus.methodNotAllowed("METHOD_NOT_ALLOWED")).toEqual({ statusCode: 405, content: "METHOD_NOT_ALLOWED" });
    expect(httpStatus.notAcceptable("NOT_ACCEPTABLE")).toEqual({ statusCode: 406, content: "NOT_ACCEPTABLE" });
    expect(httpStatus.proxyAuthenticationRequired("PROXY_AUTHENTICATION_REQUIRED")).toEqual({
      statusCode: 407,
      content: "PROXY_AUTHENTICATION_REQUIRED",
    });
    expect(httpStatus.requestTimeout("REQUEST_TIMEOUT")).toEqual({ statusCode: 408, content: "REQUEST_TIMEOUT" });
    expect(httpStatus.conflict("CONFLICT")).toEqual({ statusCode: 409, content: "CONFLICT" });
    expect(httpStatus.gone("GONE")).toEqual({ statusCode: 410, content: "GONE" });
    expect(httpStatus.lengthRequired("LENGTH_REQUIRED")).toEqual({ statusCode: 411, content: "LENGTH_REQUIRED" });
    expect(httpStatus.preconditionFailed("PRECONDITION_FAILED")).toEqual({ statusCode: 412, content: "PRECONDITION_FAILED" });
    expect(httpStatus.requestTooLong("REQUEST_TOO_LONG")).toEqual({ statusCode: 413, content: "REQUEST_TOO_LONG" });
    expect(httpStatus.requestURITooLong("REQUEST_URI_TOO_LONG")).toEqual({ statusCode: 414, content: "REQUEST_URI_TOO_LONG" });
    expect(httpStatus.unsupportedMediaType("UNSUPPORTED_MEDIA_TYPE")).toEqual({
      statusCode: 415,
      content: "UNSUPPORTED_MEDIA_TYPE",
    });
    expect(httpStatus.requestedRangeNotSatisfiable("REQUESTED_RANGE_NOT_SATISFIABLE")).toEqual({
      statusCode: 416,
      content: "REQUESTED_RANGE_NOT_SATISFIABLE",
    });
    expect(httpStatus.expectationFailed("EXPECTATION_FAILED")).toEqual({ statusCode: 417, content: "EXPECTATION_FAILED" });
    expect(httpStatus.imATeapot("IM_A_TEAPOT")).toEqual({ statusCode: 418, content: "IM_A_TEAPOT" });
    expect(httpStatus.insufficientSpaceOnResource("INSUFFICIENT_SPACE_ON_RESOURCE")).toEqual({
      statusCode: 419,
      content: "INSUFFICIENT_SPACE_ON_RESOURCE",
    });
    expect(httpStatus.methodFailure("METHOD_FAILURE")).toEqual({ statusCode: 420, content: "METHOD_FAILURE" });
    expect(httpStatus.misdirectedRequest("MISDIRECTED_REQUEST")).toEqual({ statusCode: 421, content: "MISDIRECTED_REQUEST" });
    expect(httpStatus.unprocessableEntity("UNPROCESSABLE_ENTITY")).toEqual({
      statusCode: 422,
      content: "UNPROCESSABLE_ENTITY",
    });
    expect(httpStatus.locked("LOCKED")).toEqual({ statusCode: 423, content: "LOCKED" });
    expect(httpStatus.failedDependency("FAILED_DEPENDENCY")).toEqual({ statusCode: 424, content: "FAILED_DEPENDENCY" });
    expect(httpStatus.upgradeRequired("UPGRADE_REQUIRED")).toEqual({ statusCode: 426, content: "UPGRADE_REQUIRED" });
    expect(httpStatus.preconditionRequired("PRECONDITION_REQUIRED")).toEqual({
      statusCode: 428,
      content: "PRECONDITION_REQUIRED",
    });
    expect(httpStatus.tooManyRequests("TOO_MANY_REQUESTS")).toEqual({ statusCode: 429, content: "TOO_MANY_REQUESTS" });
    expect(httpStatus.requestHeaderFieldsTooLarge("REQUEST_HEADER_FIELDS_TOO_LARGE")).toEqual({
      statusCode: 431,
      content: "REQUEST_HEADER_FIELDS_TOO_LARGE",
    });
    expect(httpStatus.unavailableForLegalReasons("UNAVAILABLE_FOR_LEGAL_REASONS")).toEqual({
      statusCode: 451,
      content: "UNAVAILABLE_FOR_LEGAL_REASONS",
    });
    expect(httpStatus.internalServerError("INTERNAL_SERVER_ERROR")).toEqual({
      statusCode: 500,
      content: "INTERNAL_SERVER_ERROR",
    });
    expect(httpStatus.notImplemented("NOT_IMPLEMENTED")).toEqual({ statusCode: 501, content: "NOT_IMPLEMENTED" });
    expect(httpStatus.badGateway("BAD_GATEWAY")).toEqual({ statusCode: 502, content: "BAD_GATEWAY" });
    expect(httpStatus.serviceUnavailable("SERVICE_UNAVAILABLE")).toEqual({ statusCode: 503, content: "SERVICE_UNAVAILABLE" });
    expect(httpStatus.gatewayTimeout("GATEWAY_TIMEOUT")).toEqual({ statusCode: 504, content: "GATEWAY_TIMEOUT" });
    expect(httpStatus.httpVersionNotSupported("HTTP_VERSION_NOT_SUPPORTED")).toEqual({
      statusCode: 505,
      content: "HTTP_VERSION_NOT_SUPPORTED",
    });
    expect(httpStatus.insufficientStorage("INSUFFICIENT_STORAGE")).toEqual({
      statusCode: 507,
      content: "INSUFFICIENT_STORAGE",
    });
    expect(httpStatus.networkAuthenticationRequired("NETWORK_AUTHENTICATION_REQUIRED")).toEqual({
      statusCode: 511,
      content: "NETWORK_AUTHENTICATION_REQUIRED",
    });
  });
});
