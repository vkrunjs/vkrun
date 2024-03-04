import { colorizeJSON } from '../colorize-json'
import { removeLogsFolder } from '../helpers/remove-logs-folder'

describe('Colorize JSON', () => {
  beforeEach(async () => { await removeLogsFolder() })
  afterEach(async () => { await removeLogsFolder() })

  it('Should color key, string, boolean and number of a JSON', async () => {
    const colorize = colorizeJSON(
      JSON.stringify({
        string: 'string',
        number: 123,
        boolean: true
      }),
      {
        red: '\x1b[31m',
        white: '\x1b[37m',
        blue: '\x1b[34m',
        yellow: '\x1b[33m',
        green: '\x1b[32m',
        purple: '\x1b[35m',
        reset: '\x1b[0m'
      },
      {
        key: 'green',
        string: 'yellow',
        number: 'blue',
        boolean: 'purple'
      }
    )

    expect(colorize).toEqual('{"\x1B[33m\x1B[32mstring\x1B[0m\x1B[0m":"\x1B[33mstring\x1B[0m","\x1B[33m\x1B[32mnumber\x1B[0m\x1B[0m":\x1B[34m123\x1B[0m,"\x1B[33m\x1B[32mboolean\x1B[0m\x1B[0m":\x1B[35mtrue\x1B[0m}')
  })
})
