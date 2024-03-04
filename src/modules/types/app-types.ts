import * as http from 'http'

export type CreateServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

export interface App {
  server: () => CreateServer
  use: (middleware: Record<string, any>) => void
}
