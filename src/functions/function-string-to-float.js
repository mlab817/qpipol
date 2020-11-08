export const convertStringToFloat = (valueToConvert) => {
  if (valueToConvert && typeof valueToConvert === 'string') {
    const stringReplaced = valueToConvert.replace(/[^\d\.]/g, '')
    return parseFloat(stringReplaced)
  }
  return 0
}
