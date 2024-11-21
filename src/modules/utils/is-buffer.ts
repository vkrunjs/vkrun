export const isBuffer = (value: any): value is Buffer => {
  return Buffer.isBuffer(value)
}
