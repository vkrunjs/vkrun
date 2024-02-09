import { schema } from './modules/schema'
import { setLocation } from './modules/location'
import { logger } from './modules/logger'

const vkrun = { schema, setLocation, logger }
export default vkrun
export { schema, setLocation, logger }
