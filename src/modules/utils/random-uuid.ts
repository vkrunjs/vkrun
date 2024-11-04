import { randomUUID as _randomUUID } from 'crypto'

export const randomUUID = (): string => {
  return _randomUUID()
}
