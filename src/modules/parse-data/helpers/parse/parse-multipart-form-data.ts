import { formatValue } from '../format'
import * as type from '../../../types'

export const parseMultipartFormData = (request: type.Request, escapeSQL: boolean): {
  body: object
  files: type.File[]
} => {
  const body: Record<string, string | number | boolean | Date> = {}
  const files: type.File[] = []

  // Custom function to split a buffer by a specified delimiter
  const bufferSplit = (buffer: any, delimiter: any): any[] => {
    let start = 0
    const parts = []
    let index

    // Loop through the buffer, splitting at each occurrence of the delimiter
    while ((index = buffer.indexOf(delimiter, start)) !== -1) {
      parts.push(buffer.slice(start, index))
      start = index + delimiter.length
    }
    // Add the remaining part after the last delimiter
    parts.push(buffer.slice(start))

    return parts
  }

  // Extract boundary string from Content-Type header
  const boundary = request.headers['content-type']?.split('boundary=')[1]
  if (!boundary) {
    throw new Error('Boundary not found')
  }

  // Convert the boundary string into a Buffer for accurate splitting
  const buffer: Buffer = request.body
  const boundaryBuffer = Buffer.from(`--${boundary}`)
  const parts = bufferSplit(buffer, boundaryBuffer)

  // Process each part individually
  for (const part of parts) {
    // Find the index where the headers end and the body data begins
    const headerEndIndex = part.indexOf('\r\n\r\n')
    if (headerEndIndex === -1) continue // Skip if no headers are found

    // Extract headers as string and bodyData as a Buffer
    const headers = part.slice(0, headerEndIndex).toString()
    const bodyData = part.slice(headerEndIndex + 4)

    // Check if this part is a file based on the presence of "filename="
    const isFile = headers.includes('filename=')
    if (isFile) {
      // Extract the filename from headers
      const filenameMatch = part.toString().match(/filename="(.+?)"/)
      const filename = filenameMatch ? filenameMatch[1] : 'uploaded_file'

      // Extract the MIME type from headers
      const mimetypeMatch = part.toString().match(/Content-Type: (.+?)\r\n/)
      const mimetype = mimetypeMatch ? mimetypeMatch[1] : 'application/octet-stream'

      // Define the start and end positions for file content
      const headerEnd = part.indexOf('\r\n\r\n') + 4
      const fileDataStart = headerEnd
      const fileDataEnd = part.lastIndexOf('\r\n') // Exclude any trailing newline
      const fileData = part.slice(fileDataStart, fileDataEnd)

      // Extract file extension from the filename
      const extension = filename.split('.').pop() ?? ''

      // Add the file information to the files array
      files.push({ filename, mimetype, extension, buffer: fileData })
    } else {
      // If not a file, treat as a regular form field

      // Extract the field name from headers
      const nameMatch = headers.match(/name="(.+?)"/)
      if (nameMatch) {
        const key = nameMatch[1]

        // Convert the body data to a string and format it if necessary
        body[key] = formatValue(bodyData.toString().trim(), escapeSQL)
      }
    }
  }

  // Return parsed body fields and file data
  return { body, files }
}
