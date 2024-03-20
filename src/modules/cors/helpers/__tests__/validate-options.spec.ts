import { validateOptions } from '../validate-options'

describe('validateOptions', () => {
  it('should throw error if options is not an object', () => {
    expect(() => validateOptions(undefined as any)).toThrow('vkrun-cors: Options must be an object.')
  })

  it('should throw error if origin is not a string or array', () => {
    expect(() => validateOptions({ origin: 123 as any })).toThrow('vkrun-cors: The origin value must be a string or string array.')
  })

  it('should throw error if methods is not a string or array', () => {
    expect(() => validateOptions({ methods: 123 as any })).toThrow('vkrun-cors: The methods value must be a string or string array.')
  })

  it('should throw error if allowedHeaders is not a string', () => {
    expect(() => validateOptions({ allowedHeaders: 123 as any })).toThrow('vkrun-cors: The allowedHeaders value must be a string.')
  })

  it('should throw error if exposedHeaders is not a string', () => {
    expect(() => validateOptions({ exposedHeaders: 123 as any })).toThrow('vkrun-cors: The exposedHeaders value must be a string.')
  })

  it('should throw error if credentials is not a boolean', () => {
    expect(() => validateOptions({ credentials: 'true' as any })).toThrow('vkrun-cors: The credentials value must be a boolean.')
  })

  it('should throw error if maxAge is not a non-negative number', () => {
    expect(() => validateOptions({ maxAge: -1 })).toThrow('vkrun-cors: The maxAge value must be a non-negative number.')
    expect(() => validateOptions({ maxAge: 'abc' as any })).toThrow('vkrun-cors: The maxAge value must be a non-negative number.')
  })

  it('should not throw error if options are valid', () => {
    expect(() => validateOptions({ origin: 'http://example.com', methods: 'GET, POST', credentials: true, maxAge: 3600 })).not.toThrow()
    expect(() => validateOptions({ origin: ['http://example.com', 'http://localhost'], methods: ['GET', 'POST'], credentials: false })).not.toThrow()
  })
})
