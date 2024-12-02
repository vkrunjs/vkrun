export const interpolateValue = (value: string, env: { [x: string]: string | undefined, TZ?: string }): string => {
  let interpolatedValue = value
  const interpolationPattern = /\$(\w+)/g

  while (interpolationPattern.test(interpolatedValue)) {
    interpolatedValue = interpolatedValue.replace(interpolationPattern, (_, key) => env[key] ?? '')
  }

  return interpolatedValue
}
