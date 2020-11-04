export const convertStringToFloat = (valueToConvert) => {
  if (valueToConvert) {
    const stringReplaced = valueToConvert.replace(/[^\d\.]/g, '')
    return parseFloat(stringReplaced)
  }
  return 0
}
