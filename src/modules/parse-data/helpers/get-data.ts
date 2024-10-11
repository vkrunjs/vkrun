import * as type from '../../types'

export const getData = async (request: type.Request): Promise<Buffer> => {
  return await new Promise((resolve) => {
    const rawData: any[] = []

    request.on('data', (chunk) => {
      rawData.push(chunk)
    })

    request.on('end', () => {
      const body = Buffer.concat(rawData)
      resolve(body)
    })
  })
}
