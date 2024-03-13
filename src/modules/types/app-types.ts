import * as http from 'http'
import * as type from '../types'

export type CreateServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

export interface App {
  server: () => CreateServer
  serverFake: (request: type.Request, response: type.Response) => Promise<type.Response>
  use: (middleware: Record<string, any>) => void
}
