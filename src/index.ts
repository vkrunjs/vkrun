import { schema } from './modules/schema'
import { setLocation } from './modules/location'
import { createLogger } from './modules/logger'

const vkrun = { schema, setLocation, createLogger }
export default vkrun
export { schema, setLocation, createLogger }
