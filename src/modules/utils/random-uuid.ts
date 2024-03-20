import cripto from 'crypto'

export const randomUUID = (): string => {
  return cripto.randomUUID()
}
