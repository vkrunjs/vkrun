import { sendToSyslog } from '../send-to-syslog'
import { createSocket } from 'dgram'

jest.mock('dgram', () => ({
  createSocket: jest.fn().mockReturnValue({
    send: jest.fn((msg, port, host, callback) => callback(null)),
    close: jest.fn(() => {})
  })
}))

describe('sendToSyslog', () => {
  it('should send a syslog message via UDP', () => {
    const mockConfig: any = {
      level: 'silly',
      format: 'default',
      dateType: 'MM-DD-YYYY',
      print: {
        enabled: false,
        format: 'default',
        colors: {
          key: 'green',
          string: 'yellow',
          number: 'blue',
          boolean: 'purple'
        }
      },
      size: (1024 * 1024) * 20,
      daysToStoreLogs: 7,
      filename: '',
      extension: 'log',
      path: 'logs',
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
      },
      colors: {
        red: '\x1b[31m',
        white: '\x1b[37m',
        blue: '\x1b[34m',
        yellow: '\x1b[33m',
        green: '\x1b[32m',
        purple: '\x1b[35m',
        reset: '\x1b[0m'
      },
      syslog: {
        enabled: true,
        host: '127.0.0.1',
        port: 514,
        protocol: 'udp',
        facility: 3,
        appName: 'test-app'
      }
    }

    sendToSyslog({
      level: 'error',
      date: '2024-12-04T15:20:00Z',
      message: 'Test message'
    }, mockConfig)

    const mockUdpSocket: any = createSocket('udp4')
    const sendMock = (mockUdpSocket.send as jest.Mock).mock
    const syslogMessage = sendMock.lastCall[0]
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    const parts = syslogMessage.split(' ')

    expect(parts[0]).toBe('<27>1') // <PRI>VERSION
    expect(timestampRegex.test(parts[1])).toBe(true) // TIMESTAMP
    expect(parts[2]).toBe('127.0.0.1') // HOSTNAME
    expect(parts[3]).toBe('test-app') // APP-NAME
    expect(parts[4]).toBe('-') // PROCID
    expect(parts[5]).toBe('-') // MSGID
    expect(parts[6]).toBe('-') // STRUCTURED-DATA
    expect(syslogMessage).toContain('Test message') // MESSAGE

    expect(mockUdpSocket.close).toHaveBeenCalled()
  })
})
