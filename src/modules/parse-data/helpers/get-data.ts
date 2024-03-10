import * as type from '../../types'

export const getData = async (request: type.Request): Promise<string> => {
  return await new Promise((resolve) => {
    let body = ''
    const files: any = []

    const headerContentType = request.headers['content-type']

    if (headerContentType?.includes('multipart/form-data')) {
      request.on('data', (chunk) => {
        body += chunk.toString()
      })

      request.on('end', () => {
        const boundaryMatch = headerContentType.match(/boundary=(?:"([^"]+)"|([^;]+))/)
        const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]) : null

        if (!boundary) {
          resolve(body)
        }

        const parts = body.toString().split(`--${boundary}`)

        for (const part of parts) {
          if (part.includes('filename')) {
            const file = { buffer: Buffer.alloc(0) }
            const dataStartIndex = part.indexOf('\r\n\r\n') + 4
            const fileData = part.substring(dataStartIndex)
            file.buffer = Buffer.from(fileData)
            files.push(file)
          }
        }

        for (const file of files) {
          const fileStartIndex = body.indexOf(file.buffer.toString())
          if (fileStartIndex !== -1) {
            body = body.slice(0, fileStartIndex) + body.slice(fileStartIndex + file.buffer.length)
          }
        }

        body = body.trim()
        resolve(body)
      })
    } else {
      request.on('data', (chunk) => {
        body += chunk.toString()
      })

      request.on('end', () => {
        body = body.trim()

        resolve(body)
      })
    }
  })
}
