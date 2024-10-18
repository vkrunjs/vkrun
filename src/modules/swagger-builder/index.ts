import * as fs from 'fs'
import * as path from 'path'
import { App } from '../app'
import * as type from '../types'

export class VkrunSwaggerBuilder implements type.VkrunSwaggerBuilder {
  private doc: type.SwaggerOpenAPIConfig & type.SwaggerOpenAPIDocument
  private currentPath: string
  private readonly swaggerUiDist: any

  constructor (swaggerUiDist: any) {
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
    this.currentPath = ''
    this.swaggerUiDist = swaggerUiDist
  }

  public create (config: type.SwaggerOpenAPIConfig): this {
    this.doc = { ...this.doc, ...config }
    return this
  }

  public route (path: string): type.SwaggerRouteBuilder {
    const swaggerPath = path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}')

    if (!this.doc.paths[swaggerPath]) {
      this.doc.paths[swaggerPath] = {}
    }
    this.currentPath = swaggerPath

    const routeBuilder: type.SwaggerRouteBuilder = {
      post: (options: type.SwaggerOperation) => {
        this.addMethod('post', options)
        return routeBuilder
      },
      put: (options: type.SwaggerOperation) => {
        this.addMethod('put', options)
        return routeBuilder
      },
      patch: (options: type.SwaggerOperation) => {
        this.addMethod('patch', options)
        return routeBuilder
      },
      get: (options: type.SwaggerOperation) => {
        this.addMethod('get', options)
        return routeBuilder
      },
      delete: (options: type.SwaggerOperation) => {
        this.addMethod('delete', options)
        return routeBuilder
      },
      options: (options: type.SwaggerOperation) => {
        this.addMethod('options', options)
        return routeBuilder
      }
    }

    return routeBuilder
  }

  private addMethod (method: string, options: type.SwaggerOperation): this {
    if (!this.doc.paths[this.currentPath]) {
      this.doc.paths[this.currentPath] = {}
    }
    this.doc.paths[this.currentPath][method] = options
    return this
  }

  private serve (request: any, response: any, visibilityKeys: string[]): void {
    const filteredDoc = JSON.parse(JSON.stringify(this.doc))

    filteredDoc.paths = Object.entries(filteredDoc.paths).reduce<Record<string, any>>((acc: Record<string, any>, [path, methods]) => {
      const methodsTyped = methods as Record<string, type.SwaggerOperation>

      const filteredMethods = Object.entries(methodsTyped)
        .reduce<Record<string, type.SwaggerOperation>>(
        (methodAcc: Record<string, type.SwaggerOperation>, [method, spec]) => {
          const specTyped = spec

          if (specTyped.visibilityKeys && visibilityKeys.some(
            key => specTyped.visibilityKeys?.includes(key)
          )) {
            methodAcc[method] = specTyped
          }
          return methodAcc
        }, {})

      if (Object.keys(filteredMethods).length > 0) {
        acc[path] = filteredMethods
      }
      return acc
    }, {})

    filteredDoc.openapi = this.doc.openapi || '3.0.0'

    const swaggerDocJson = JSON.stringify(filteredDoc, null, 2)

    if (!this.swaggerUiDist) {
      response.status(500).send('swaggerUiDist is not configured')
      return
    }

    const swaggerUiPath = this.swaggerUiDist.absolutePath()
    const swaggerUiCssPath = path.join(swaggerUiPath, 'swagger-ui.css')
    const indexCssPath = path.join(swaggerUiPath, 'index.css')
    const jsBundlePath = path.join(swaggerUiPath, 'swagger-ui-bundle.js')
    const jsStandalonePresetPath = path.join(swaggerUiPath, 'swagger-ui-standalone-preset.js')

    const swaggerUiCss = fs.existsSync(swaggerUiCssPath)
      ? fs.readFileSync(swaggerUiCssPath, 'utf-8')
      : ''
    const indexCss = fs.existsSync(indexCssPath)
      ? fs.readFileSync(indexCssPath, 'utf-8')
      : ''
    const jsBundle = fs.existsSync(jsBundlePath)
      ? fs.readFileSync(jsBundlePath, 'utf-8')
      : ''
    const jsStandalonePreset = fs.existsSync(jsStandalonePresetPath)
      ? fs.readFileSync(jsStandalonePresetPath, 'utf-8')
      : ''

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="icon" type="image/png" href="data:image/png;base64,${fs.existsSync(path.join(swaggerUiPath, 'favicon-32x32.png')) ? fs.readFileSync(path.join(swaggerUiPath, 'favicon-32x32.png')).toString('base64') : ''}" sizes="32x32" />
        <link rel="icon" type="image/png" href="data:image/png;base64,${fs.existsSync(path.join(swaggerUiPath, 'favicon-16x16.png')) ? fs.readFileSync(path.join(swaggerUiPath, 'favicon-16x16.png')).toString('base64') : ''}" sizes="16x16" />
        <style>${swaggerUiCss}</style>
        <style>${indexCss}</style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script>${jsBundle}</script>
        <script>${jsStandalonePreset}</script>
        <script>
          window.onload = function() {
            const ui = SwaggerUIBundle({
              spec: ${swaggerDocJson},  
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
                setTimeout(setupFilterEvents, 500);  // Tenta novamente em 500ms
              }
            }
          
            setupFilterEvents();
                      
            window.ui = ui;
          };              
        </script>
      </body>
      </html>
    `

    response.setHeader('Content-Type', 'text/html')
    response.status(200).send(html)
  }

  public getConfig (): type.SwaggerOpenAPIConfig & type.SwaggerOpenAPIDocument {
    return this.doc
  }

  public getDocument (): string {
    const docJson = JSON.parse(JSON.stringify(this.doc))
    const swaggerUiPath = this.swaggerUiDist.absolutePath()
    const swaggerUiCssPath = path.join(swaggerUiPath, 'swagger-ui.css')
    const indexCssPath = path.join(swaggerUiPath, 'index.css')
    const jsBundlePath = path.join(swaggerUiPath, 'swagger-ui-bundle.js')
    const jsStandalonePresetPath = path.join(swaggerUiPath, 'swagger-ui-standalone-preset.js')

    const swaggerUiCss = fs.existsSync(swaggerUiCssPath)
      ? fs.readFileSync(swaggerUiCssPath, 'utf-8')
      : ''
    const indexCss = fs.existsSync(indexCssPath)
      ? fs.readFileSync(indexCssPath, 'utf-8')
      : ''
    const jsBundle = fs.existsSync(jsBundlePath)
      ? fs.readFileSync(jsBundlePath, 'utf-8')
      : ''
    const jsStandalonePreset = fs.existsSync(jsStandalonePresetPath)
      ? fs.readFileSync(jsStandalonePresetPath, 'utf-8')
      : ''

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="icon" type="image/png" href="data:image/png;base64,${fs.existsSync(path.join(swaggerUiPath, 'favicon-32x32.png')) ? fs.readFileSync(path.join(swaggerUiPath, 'favicon-32x32.png')).toString('base64') : ''}" sizes="32x32" />
        <link rel="icon" type="image/png" href="data:image/png;base64,${fs.existsSync(path.join(swaggerUiPath, 'favicon-16x16.png')) ? fs.readFileSync(path.join(swaggerUiPath, 'favicon-16x16.png')).toString('base64') : ''}" sizes="16x16" />
        <style>${swaggerUiCss}</style>
        <style>${indexCss}</style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script>${jsBundle}</script>
        <script>${jsStandalonePreset}</script>
        <script>
          window.onload = function() {
            const ui = SwaggerUIBundle({
              spec: ${docJson},  
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
                setTimeout(setupFilterEvents, 500);  // Tenta novamente em 500ms
              }
            }
          
            setupFilterEvents();
                      
            window.ui = ui;
          };              
        </script>
      </body>
      </html>
    `

    return html
  }

  public listen (
    port: number,
    visibilityKeys: string[],
    callback?: () => Promise<void> | void
  ): void {
    const app = App()
    app.cors()
    app.parseData()

    app.get('/api-docs', (request: type.Request, response: type.Response) => {
      this.serve(request, response, visibilityKeys)
    })

    app.get('/*', (request: type.Request, response: type.Response) => {
      const value = request.url ? decodeURIComponent(request.url) : ''

      const fullDoc = this.getConfig()
      const filteredDoc = {
        ...fullDoc,
        paths: Object.keys(fullDoc.paths).reduce<typeof fullDoc.paths>((acc, path) => {
          const methods = fullDoc.paths[path]

          const filteredMethods = Object.entries(methods)
            .reduce<Record<string, type.SwaggerOperation>>(
            (methodAcc, [method, spec]) => {
              const specTyped = spec

              const matchesPath = path.includes(value)
              const matchesDescription = specTyped.description
                ?.toLowerCase()
                .includes(value.replace('/', '')
                  .toLowerCase())
              const matchesSummary = specTyped.summary
                ?.toLowerCase()
                .includes(value.replace('/', '').toLowerCase())
              const matchesTags = specTyped.tags
                ?.some(tag =>
                  tag.toLowerCase()
                    .includes(value.replace('/', '')
                      .toLowerCase())
                )

              const matchesVisibility = specTyped.visibilityKeys && visibilityKeys.some(
                key => specTyped.visibilityKeys?.includes(key)
              )

              if (
                (
                  matchesPath ||
                matchesDescription ||
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                matchesSummary ||
                matchesTags
                ) &&
              matchesVisibility
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

      if (Object.keys(filteredDoc.paths).length === 0) {
        response.setHeader('Content-Type', 'application/json')
        response.status(200).send(JSON.stringify({
          ...this.getConfig(),
          paths: {}
        }))
      } else {
        response.setHeader('Content-Type', 'application/json')
        response.status(200).send(JSON.stringify(filteredDoc))
      }
    })

    app.get('/', (_request: type.Request, response: type.Response) => {
      response.setHeader('Content-Type', 'application/json')
      response.status(200).send(JSON.stringify({
        ...this.getConfig(),
        paths: {}
      }))
    })

    app.server().listen(port, callback)
  }
}

export const swaggerBuilder = (swaggerUiDist: any): type.VkrunSwaggerBuilder => {
  return new VkrunSwaggerBuilder(swaggerUiDist)
}
