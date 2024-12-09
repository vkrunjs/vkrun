import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import {
  Request,
  Response,
  NextFunction,
  SwaggerOpenAPIConfig,
  SwaggerOpenAPIDocument,
  SwaggerOperation,
  SwaggerRouteBuilder,
  VkrunSwaggerUi
} from '../types'

export class SwaggerUiSetup implements VkrunSwaggerUi {
  private readonly doc: SwaggerOpenAPIConfig & SwaggerOpenAPIDocument
  private currentPath: string
  private swaggerUiPath: string
  private baseUrl: string

  constructor (config?: SwaggerOpenAPIConfig | SwaggerOpenAPIConfig & SwaggerOpenAPIDocument) {
    this.doc = {
      openapi: '3.0.0',
      info: {
        title: '',
        version: '',
        description: ''
      },
      paths: {},
      components: {
        securitySchemes: {}
      },
      servers: [],
      security: []
    }
    this.baseUrl = ''
    this.currentPath = ''
    this.swaggerUiPath = ''

    if (config) {
      this.doc = { ...this.doc, ...config }
    }
  }

  public route (path: string): SwaggerRouteBuilder {
    const swaggerPath = path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}')

    if (!this.doc.paths[swaggerPath]) {
      this.doc.paths[swaggerPath] = {}
    }
    this.currentPath = swaggerPath

    const routeBuilder: SwaggerRouteBuilder = {
      post: (options: SwaggerOperation) => {
        this.addMethod('post', options)
        return routeBuilder
      },
      put: (options: SwaggerOperation) => {
        this.addMethod('put', options)
        return routeBuilder
      },
      patch: (options: SwaggerOperation) => {
        this.addMethod('patch', options)
        return routeBuilder
      },
      get: (options: SwaggerOperation) => {
        this.addMethod('get', options)
        return routeBuilder
      },
      delete: (options: SwaggerOperation) => {
        this.addMethod('delete', options)
        return routeBuilder
      },
      options: (options: SwaggerOperation) => {
        this.addMethod('options', options)
        return routeBuilder
      }
    }

    return routeBuilder
  }

  private addMethod (method: string, options: SwaggerOperation): this {
    if (!this.doc.paths[this.currentPath]) {
      this.doc.paths[this.currentPath] = {}
    }
    this.doc.paths[this.currentPath][method] = options
    return this
  }

  private getConfig (): SwaggerOpenAPIConfig & SwaggerOpenAPIDocument {
    return this.doc
  }

  private generateSwaggerHTML (): string {
    const swaggerUiCssPath = join(this.swaggerUiPath, 'swagger-ui.css')
    const indexCssPath = join(this.swaggerUiPath, 'index.css')
    const jsBundlePath = join(this.swaggerUiPath, 'swagger-ui-bundle.js')
    const jsStandalonePresetPath = join(this.swaggerUiPath, 'swagger-ui-standalone-preset.js')

    const swaggerUiCss = existsSync(swaggerUiCssPath)
      ? readFileSync(swaggerUiCssPath, 'utf-8')
      : ''
    const indexCss = existsSync(indexCssPath)
      ? readFileSync(indexCssPath, 'utf-8')
      : ''
    const jsBundle = existsSync(jsBundlePath)
      ? readFileSync(jsBundlePath, 'utf-8')
      : ''
    const jsStandalonePreset = existsSync(jsStandalonePresetPath)
      ? readFileSync(jsStandalonePresetPath, 'utf-8')
      : ''

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="icon" type="image/png" href="data:image/png;base64,${existsSync(join(this.swaggerUiPath, 'favicon-32x32.png')) ? readFileSync(join(this.swaggerUiPath, 'favicon-32x32.png')).toString('base64') : ''}" sizes="32x32" />
        <link rel="icon" type="image/png" href="data:image/png;base64,${existsSync(join(this.swaggerUiPath, 'favicon-16x16.png')) ? readFileSync(join(this.swaggerUiPath, 'favicon-16x16.png')).toString('base64') : ''}" sizes="16x16" />
        <style>${swaggerUiCss}</style>
        <style>${indexCss}</style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script>${jsBundle}</script>
        <script>${jsStandalonePreset}</script>
        <script>
          window.onload = function () {
            const ui = SwaggerUIBundle({
              spec: ${JSON.stringify(this.getConfig(), null, 2)},
              dom_id: '#swagger-ui',
              deepLinking: false,

              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              layout: 'StandaloneLayout'
            });

            function setupFilterEvents() {
              const exploreButton = document.querySelector('.download-url-button');
              const urlInput = document.getElementById('download-url-input');
              
              if (urlInput) {
                urlInput.addEventListener('input', (event) => {
                  if (urlInput.value.startsWith('/')) {
                    urlInput.value = urlInput.value.substring(1);
                  }
                });
              }

              if (exploreButton && urlInput) {
                exploreButton.addEventListener('click', (event) => {
                  event.preventDefault();
                  if (!urlInput.value) {
                    location.reload();
                  }
                });

                urlInput.addEventListener('keypress', (event) => {
                  if (event.key === 'Enter') {
                    if (!urlInput.value) {
                      event.preventDefault();
                      location.reload();
                    }
                  }
                });
              } else {
                setTimeout(setupFilterEvents, 500);
              }
            }

            setupFilterEvents();
            window.ui = ui;
          };
        </script>
      </body>
      </html>
    `
  }

  private serveSwaggerJSON (req: Request, res: Response): void {
    const url = req.url ?? ''
    const param = decodeURIComponent(url.replace(this.baseUrl, '').trim())

    const filteredDoc = param
      ? this.filterSwaggerDoc(param)
      : this.getConfig()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(filteredDoc, null, 2))
  }

  private filterSwaggerDoc (param: string): SwaggerOpenAPIConfig & SwaggerOpenAPIDocument {
    const config = this.getConfig()
    return {
      ...config,
      paths: Object.keys(config.paths).reduce < typeof config.paths >((acc, path) => {
        const methods = config.paths[path]

        const filteredMethods = Object.entries(methods)
          .reduce<Record<string, SwaggerOperation>>(
          (methodAcc, [method, spec]) => {
            const specTyped = spec

            const matchesPath = path.includes(param)
            const matchesDescription = specTyped.description
              ?.toLowerCase()
              .includes(param.replace('/', '')
                .toLowerCase())
            const matchesSummary = specTyped.summary
              ?.toLowerCase()
              .includes(param.replace('/', '').toLowerCase())
            const matchesTags = specTyped.tags
              ?.some(tag =>
                tag.toLowerCase()
                  .includes(param.replace('/', '')
                    .toLowerCase())
              )

            if (
              (
                matchesPath ||
                matchesDescription ||
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                matchesSummary ||
                matchesTags
              )
            ) {
              methodAcc[method] = specTyped
            }

            return methodAcc
          }, {})

        if (Object.keys(filteredMethods).length > 0) {
          acc[path] = filteredMethods
        }

        return acc
      }, {})
    }
  }

  private serveStaticFiles (req: Request, res: Response, next: NextFunction): void {
    const url = req.url ?? ''
    const filePath = join(this.swaggerUiPath, url.replace(this.baseUrl, ''))
    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath)
      const mimeType = url.endsWith('.css')
        ? 'text/css'
        : url.endsWith('.js')
          ? 'application/javascript'
          : 'text/plain'
      res.setHeader('Content-Type', mimeType)
      res.status(200).end(fileData)
    } else {
      return this.serveSwaggerJSON(req, res)
    }
  }

  private setupSwaggerHTML (req: Request, res: Response): void {
    const html = this.generateSwaggerHTML()
    res.setHeader('Content-Type', 'text/html')
    res.status(200).end(html)
  }

  public serve (absolutePath: string): (req: Request, res: Response, next: NextFunction) => void {
    this.swaggerUiPath = absolutePath

    return (req: Request, res: Response, next: NextFunction) => {
      const url = req.url ?? ''
      if (
        url.includes('/index.html') ||
        (url.endsWith('/') && !this.baseUrl) ||
        (url.endsWith('/') && url === this.baseUrl)
      ) {
        this.baseUrl = url.replace('/index.html', '/')
        return this.setupSwaggerHTML(req, res)
      } else if (url.includes('/swagger.json')) {
        return this.serveSwaggerJSON(req, res)
      }
      return this.serveStaticFiles(req, res, next)
    }
  }
}

/**
 * @function swaggerUi
 *
 * Configures the Swagger UI for the application, enabling the visualization and interaction with the API documentation.
 * This function provides two primary use cases:
 * 1. Define API routes using the integrated route builder.
 * 2. Directly serve an existing Swagger JSON configuration.
 *
 * **Swagger UI Configuration Options:**
 * - **openapi**: The version of the OpenAPI specification (default is `'3.0.0'`).
 * - **info**: Provides metadata about the API, such as `title`, `version`, and `description`.
 * - **paths**: Defines the endpoints available in the API, including HTTP methods, parameters, and responses.
 * - **components**: Contains reusable components, such as `securitySchemes`, `schemas`, and `parameters`.
 * - **servers**: Lists the available servers for the API (e.g., development, staging, or production).
 * - **security**: Specifies security requirements for the API, such as Bearer tokens or API keys.
 *
 * **Usage Options:**
 * - If a configuration object is passed, you can dynamically define API routes using the `route` method.
 * - Alternatively, you can pass an absolute path to Swagger UI's distribution files (e.g., via `swagger-ui-dist` package)
 *   and an existing Swagger JSON object to serve pre-defined documentation.
 *
 * @param {SwaggerOpenAPIConfig} [config] - The configuration object for Swagger UI. If not provided, a default configuration is used.
 * @returns {VkrunSwaggerUi} - An instance of `VkrunSwaggerUi`, which allows you to define routes or serve an existing Swagger JSON configuration.
 *
 * @example
 * // Example 1: Using integrated route builder
 * import { swaggerUi } from "vkrun"
 * import swaggerUiDist from "swagger-ui-dist"
 *
 * const swagger = swaggerUi({
 *   openapi: "3.0.0",
 *   info: {
 *     title: "API Documentation",
 *     version: "1.0.0",
 *     description: "API with public and private routes."
 *   },
 *   servers: [{ url: "http://localhost:3000", description: "Development Server" }],
 *   components: {
 *     securitySchemes: {
 *       BearerAuth: {
 *         type: "http",
 *         scheme: "bearer",
 *         bearerFormat: "JWT"
 *       }
 *     }
 *   }
 * })
 *
 * swagger.route("/public").get({
 *   summary: "Public Route",
 *   description: "This route is public and requires no authentication.",
 *   responses: {
 *     200: { description: "Success", content: { "application/json": { schema: { type: "object", properties: { message: { type: "string", example: "This is a public route." } } } } } }
 *   }
 * })
 *
 * app.get("/api-docs/*", swagger.serve(swaggerUiDist.absolutePath()));
 *
 * // Example 2: Serving a pre-defined Swagger JSON object
 * import { swaggerUi } from "vkrun"
 * import swaggerJSON from "./swagger.json"
 *
 * app.get("/api-docs/*", swaggerUi(swaggerJSON).serve(swaggerUiDist.absolutePath()));
 */
export const swaggerUi = (config?: SwaggerOpenAPIConfig): VkrunSwaggerUi => {
  return new SwaggerUiSetup(config)
}
