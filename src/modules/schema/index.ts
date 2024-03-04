import { Schema } from './schema'
import * as type from '../types'
export { setLocation } from './location'

export const schema = (): type.ISchema => {
  return new Schema()
}
