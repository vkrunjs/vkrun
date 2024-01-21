export const deepEqual = (value: any, valueToCompare: any): boolean => {
  if (typeof value !== typeof valueToCompare) {
    return false
  }

  if ((typeof value === 'object' && value !== null) && (typeof valueToCompare === 'object' && valueToCompare !== null)) {
    const keysA = Object.keys(value)
    const keysB = Object.keys(valueToCompare)

    if (keysA.length !== keysB.length || !keysA.every(key => keysB.includes(key))) {
      return false
    }

    return keysA.every(key => deepEqual(value[key], valueToCompare[key]))
  }

  if (Array.isArray(value) && Array.isArray(valueToCompare)) {
    if (value.length !== valueToCompare.length) {
      return false
    }

    return value.every((value, index) => deepEqual(value, valueToCompare[index]))
  }

  return value === valueToCompare
}
