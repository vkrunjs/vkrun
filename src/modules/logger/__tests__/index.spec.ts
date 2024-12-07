import { Logger } from '..'

describe('Logger', () => {
  it('Should create a logger with correct configuration', async () => {
    const logger = Logger({
      level: 'error',
      format: 'indented',
      dateType: 'MM-DD-YYYY',
      print: {
        enabled: true,
        format: 'default',
        colors: {
          key: 'green',
          string: 'yellow',
          number: 'blue',
          boolean: 'purple'
        }
      },
      size: 5,
      daysToStoreLogs: 0,
      extension: 'log',
      path: 'logs'
    })

    expect(logger).toEqual({
      error: expect.any(Function),
      warn: expect.any(Function),
      info: expect.any(Function),
      http: expect.any(Function),
      verbose: expect.any(Function),
      debug: expect.any(Function),
      silly: expect.any(Function)
    })
  })
})
