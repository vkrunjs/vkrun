import { Colors, PrintColors } from './types'

export const colorizeJSON = (jsonString: string, colors: Colors, printColors: PrintColors): string => {
  // change color json key
  jsonString = jsonString.replace(/"(\w+)"\s*:/g, `"${colors[printColors.key]}$1${colors.reset}":`)

  // change color string
  jsonString = jsonString.replace(/"([^"]*)"/g, (_: string, p1: string) => {
    if (!p1.trim()) return _ // Se a string estiver vazia, não colorize
    return `"${colors[printColors.string]}${p1}${colors.reset}"`
  })

  // change color boolean
  jsonString = jsonString.replace(/\b(true|false)\b/g, `${colors[printColors.boolean]}$&${colors.reset}`)

  // change color number
  jsonString = jsonString.replace(/\b\d+\b(?=(?:[^"]*"[^"]*")*[^"]*$)/g, `${colors[printColors.number]}$&${colors.reset}`)

  return jsonString
}
