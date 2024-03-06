/* eslint-disable no-control-regex */
export const escape = {
  // eslint-disable-next-line no-useless-escape
  REGEX_CHARS_GLOBAL: /[\0\b\t\n\r\x1a\"\'\\]/g,
  REGEX_WORLDS_SQL: /(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)/i,
  ESCAPE_CHARS: {
    '\0': '\\0',
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\r': '\\r',
    '\x1a': '\\Z',
    '"': '\\"',
    '\'': '\\\'',
    '\\': '\\\\'
  }
}

export const parseEscapeSQL = (value: string): string => {
  const { REGEX_CHARS_GLOBAL, ESCAPE_CHARS, REGEX_WORLDS_SQL } = escape
  const containWorldSQL = REGEX_WORLDS_SQL.test(value)

  if (containWorldSQL) {
    let chunkIndex = REGEX_CHARS_GLOBAL.lastIndex = 0
    let escapedVal = ''
    let match

    while ((match = REGEX_CHARS_GLOBAL.exec(value))) {
      const matchedChar = match[0] as keyof typeof ESCAPE_CHARS
      escapedVal += value.slice(chunkIndex, match.index) + ESCAPE_CHARS[matchedChar]
      chunkIndex = REGEX_CHARS_GLOBAL.lastIndex
    }

    if (chunkIndex === 0) {
      return "'" + value + "'"
    }

    if (chunkIndex < value.length) {
      return "'" + escapedVal + value.slice(chunkIndex) + "'"
    }

    return "'" + escapedVal + "'"
  } else {
    return value
  }
}
