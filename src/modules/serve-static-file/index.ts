import { readFileSync } from 'fs'
import { basename, join } from 'path'
import { mime } from '../mime'
import { Request, Response } from '../types'

/**
 * @function serveStaticFile
 *
 * A middleware function for serving static files from a specified base directory.
 * This middleware handles requests that match a given URL pattern (e.g., `/static/*`),
 * reads the file from the file system, and sends it to the client with appropriate headers like
 * `Content-Type` and `Content-Length`. If the file is not found or there is an error parsing the request
 * URL, it will return a 404 error.
 *
 * **Usage Example:**
 * ```ts
 * import { App, serveStaticFile } from 'vkrun'
 *
 * const app = App()
 *
 * const basePath = 'public' // Directory containing static files
 *
 * // Serve static files from the 'public' directory
 * app.get('/static/*', serveStaticFile(basePath))
 *
 * app.server().listen(3000, () => {
 *   console.log('Server is running on port 3000')
 * })
 * ```
 * In this example:
 * - Requests to `/static/*` will serve files from the `public` directory.
 * - If the requested file does not exist, a `404` response will be returned.
 *
 * **Error Handling:**
 * - If the file is not found, a `404 - File Not Found` message is returned.
 * - If there is an error parsing the URL, a `404 - Error Parsing File` message is returned.
 *
 * **MIME Types Handling:**
 * The middleware automatically determines the appropriate MIME type for each file based on its extension.
 * Supported MIME types include:
 * - `text/html` for `.html` files
 * - `image/png` for `.png` images
 * - `application/pdf` for `.pdf` files
 * - And many more.
 *
 * @param {string} basePath - The base path to the directory containing static files.
 *                            This path will be used to resolve file requests.
 *                            For example, if `basePath` is `'public'`, then files in the `public` directory will be served.
 */
export const serveStaticFile = (basePath: string) => {
  return (request: Request, response: Response) => {
    try {
      const routePath = request?.route?.path ?? ''
      const url = request?.url ?? ''
      const encodedFileName = url.replace(routePath.replace('*', ''), '')
      const filenamePath = decodeURIComponent(encodedFileName)
      const filename = basename(filenamePath)
      const fullPath = join(basePath, filenamePath)

      try {
        const data = readFileSync(fullPath)
        const extension = filename.split('.').pop() ?? ''
        const mimeType = mime.type(extension) ?? 'application/octet-stream'

        response.setHeader('Content-Type', mimeType)
        return response.status(200).end(data)
      } catch (err) {
        response.setHeader('Content-Type', 'text/plain')
        return response.status(404).send('404 - File Not Found')
      }
    } catch (error) {
      response.setHeader('Content-Type', 'text/plain')
      return response.status(404).send('404 - Error Parsing File')
    }
  }
}
