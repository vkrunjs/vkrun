import v from 'vkrun'

const logger = v.Logger({ level: 'error', daysToStoreLogs: 0 })

try {
  throw new Error('Any Error')
} catch (error) {
  logger.error(error)
}
