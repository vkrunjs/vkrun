import { statusTexts } from './status-texts'

class CreateHttpResponse {
  public statusCode: number = 205
  public headers: any = {}
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private _body: any = undefined
  public data: any = undefined
  public ended: boolean = false

  public connection: any
  public finished: boolean = false
  public headersSent: boolean = false
  public request: any
  public sendDate: boolean = false

  public flushHeaders (): void {}
  public write (chunk: any, encoding?: string, callback?: () => void): void {}
  public writeContinue (): void {}
  public writeHead (statusCode: number, statusText?: string, headers?: any): void {}

  public statusText: string = statusTexts[this.statusCode]

  hasHeader (name: string): boolean {
    return !!this.headers[name.toLowerCase()]
  }

  setHeader (name: string, value: string | string[]): void {
    this.headers[name.toLowerCase()] = value
  }

  getHeader (name: string): string | string[] | undefined {
    return this.headers[name.toLowerCase()]
  }

  removeHeader (name: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.headers[name.toLowerCase()]
  }

  end (data?: any): void {
    this.statusText = statusTexts[this.statusCode]

    if (data !== undefined) {
      this.data = data
    } else {
      this.data = this._body
    }
    this.ended = true

    this.finished = true
    this.headersSent = true
    this.sendDate = true
    this.finished = true
    this.request.socket.destroy()
    this.request.end()
  }
}

export const createHttpResponse = (request: any): any => {
  const response = new CreateHttpResponse()
  response.request = request
  return response
}
