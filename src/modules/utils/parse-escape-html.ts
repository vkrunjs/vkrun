const htmlEscapeMap: Record<string, string> = {
  '"': '&quot;',
  '&': '&amp;',
  '\'': '&#39;',
  '<': '&lt;',
  '>': '&gt;'
}

const matchHtmlRegExp = /["'&<>]/

export const parseEscapeHTML = (value: string): string => {
  if (!matchHtmlRegExp.test(value)) {
    return value
  }

  let escapedHtml = ''
  let lastIndex = 0

  for (let index = 0; index < value.length; index++) {
    const char = value[index]
    const escape = htmlEscapeMap[char]

    if (escape) {
      if (lastIndex !== index) {
        escapedHtml += value.substring(lastIndex, index)
      }
      escapedHtml += escape
      lastIndex = index + 1
    }
  }

  return escapedHtml
}
