import fs from 'fs'
import { resolve } from 'path'
import { schema } from '../../..'
import { loadEnv } from '..'
import { LoadEnvError } from '../../errors'

describe('Load Env', () => {
  const tempEnvPath = resolve(__dirname, '.env.test')

  const createEnvFile = (content: string): void => {
    fs.writeFileSync(tempEnvPath, content, { encoding: 'utf8' })
  }

  const deleteEnvFile = (): void => {
    if (fs.existsSync(tempEnvPath)) {
      fs.unlinkSync(tempEnvPath)
    }
  }

  beforeEach(() => {
    deleteEnvFile()
    process.env = {}
  })

  afterEach(() => {
    deleteEnvFile()
  })

  it('Should load variables from a real .env file', () => {
    const envContent =
`EXAMPLE_1="John Doe"
EXAMPLE_2='John Doe'
EXAMPLE_3=John Doe
EXAMPLE_4=JohnDoe
EXAMPLE_5=true
EXAMPLE_6=false
EXAMPLE_7="true"
EXAMPLE_8="false"
EXAMPLE_9=42
EXAMPLE_10="42"
EXAMPLE_11=["42", true, 123, { "key": "value" }]
EXAMPLE_12={ "key": "value" }`

    createEnvFile(envContent)

    const envs = loadEnv<{
      EXAMPLE_1: string
      EXAMPLE_2: string
      EXAMPLE_3: string
      EXAMPLE_4: string
      EXAMPLE_5: boolean
      EXAMPLE_6: boolean
      EXAMPLE_7: string
      EXAMPLE_8: string
      EXAMPLE_9: number
      EXAMPLE_10: string
      EXAMPLE_11: any[]
      EXAMPLE_12: Record<string, any>
    }>({ path: tempEnvPath })

    expect(process.env.EXAMPLE_1).toEqual('John Doe')
    expect(process.env.EXAMPLE_2).toEqual('John Doe')
    expect(process.env.EXAMPLE_3).toEqual('John Doe')
    expect(process.env.EXAMPLE_4).toEqual('JohnDoe')
    expect(process.env.EXAMPLE_5).toBeTruthy()
    expect(process.env.EXAMPLE_6).toBeFalsy()
    expect(process.env.EXAMPLE_7).toEqual('true')
    expect(process.env.EXAMPLE_8).toEqual('false')
    expect(process.env.EXAMPLE_9).toEqual(42)
    expect(process.env.EXAMPLE_10).toEqual('42')
    expect(process.env.EXAMPLE_11).toEqual(['42', true, 123, { key: 'value' }])
    expect(process.env.EXAMPLE_12).toEqual({ key: 'value' })

    expect(envs.EXAMPLE_1).toEqual('John Doe')
    expect(envs.EXAMPLE_2).toEqual('John Doe')
    expect(envs.EXAMPLE_3).toEqual('John Doe')
    expect(envs.EXAMPLE_4).toEqual('JohnDoe')
    expect(envs.EXAMPLE_5).toBeTruthy()
    expect(envs.EXAMPLE_6).toBeFalsy()
    expect(envs.EXAMPLE_7).toEqual('true')
    expect(envs.EXAMPLE_8).toEqual('false')
    expect(envs.EXAMPLE_9).toEqual(42)
    expect(envs.EXAMPLE_10).toEqual('42')
    expect(envs.EXAMPLE_11).toEqual(['42', true, 123, { key: 'value' }])
    expect(envs.EXAMPLE_12).toEqual({ key: 'value' })
  })

  it('Should load variables from a real .env file with comments', () => {
    const envContent = `
      # Comment
      EXAMPLE_1="John Doe"# Comment
      EXAMPLE_2='John Doe' # Comment
      EXAMPLE_3=John Doe  # Comment
      # Comment
      EXAMPLE_4=JohnDoe # Comment
      EXAMPLE_5=true# Comment
      EXAMPLE_6=false# Comment
      EXAMPLE_7="true"# Comment
      EXAMPLE_8="false"# Comment
      EXAMPLE_9=42 # Comment
      EXAMPLE_10="42" # Comment
      EXAMPLE_11=["42", true, 123, { "key": "value" }]# Comment
      EXAMPLE_12={ "key": "value" }# Comment
      # Comment
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.EXAMPLE_1).toEqual('John Doe')
    expect(process.env.EXAMPLE_2).toEqual('John Doe')
    expect(process.env.EXAMPLE_3).toEqual('John Doe')
    expect(process.env.EXAMPLE_4).toEqual('JohnDoe')
    expect(process.env.EXAMPLE_5).toBeTruthy()
    expect(process.env.EXAMPLE_6).toBeFalsy()
    expect(process.env.EXAMPLE_7).toEqual('true')
    expect(process.env.EXAMPLE_8).toEqual('false')
    expect(process.env.EXAMPLE_9).toEqual(42)
    expect(process.env.EXAMPLE_10).toEqual('42')
    expect(process.env.EXAMPLE_11).toEqual(['42', true, 123, { key: 'value' }])
    expect(process.env.EXAMPLE_12).toEqual({ key: 'value' })
  })

  it('Should validate variables against schema', () => {
    const envContent = `
      NAME="John Doe"
      ENABLED=true
      COUNT=42
      SETTINGS={"key":"value"}
    `
    createEnvFile(envContent)

    const envSchema = schema().object({
      NAME: schema().string(),
      ENABLED: schema().boolean(),
      COUNT: schema().number(),
      SETTINGS: schema().object({
        key: schema().string()
      })
    })

    console.log({ envSchema })

    expect(() => loadEnv({ path: tempEnvPath, schema: envSchema })).not.toThrow()
  })

  it('Should throw an error if schema validation fails', () => {
    const envContent = `
      NAME="John Doe"
      ENABLED=true
      COUNT=42
      SETTINGS={"key":"value"}
    `
    createEnvFile(envContent)

    const invalidSchema = schema().object({
      NAME: schema().string(),
      ENABLED: schema().boolean(),
      COUNT: schema().string(), // Invalid type
      SETTINGS: schema().object({
        key: schema().number() // Invalid type
      })
    })

    expect(() => loadEnv({ path: tempEnvPath, schema: invalidSchema })).toThrow('failed to load env variables: COUNT must be a string type!')
  })

  it('Should handle invalid lines and comments gracefully', () => {
    const envContent =
`# This is a comment
NAME="John Doe"

# Another comment
ENABLED=true
INVALID_LINE`

    createEnvFile(envContent)

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

    loadEnv({ path: tempEnvPath, debug: true })

    expect(process.env.NAME).toBe('John Doe')
    expect(process.env.ENABLED).toBe(true)

    expect(consoleWarnSpy).toHaveBeenCalledTimes(4)
    expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, 'loadEnv: ignoring empty or comment line at 1')
    expect(consoleWarnSpy).toHaveBeenNthCalledWith(2, 'loadEnv: ignoring empty or comment line at 3')
    expect(consoleWarnSpy).toHaveBeenNthCalledWith(3, 'loadEnv: ignoring empty or comment line at 4')
    expect(consoleWarnSpy).toHaveBeenNthCalledWith(4, 'loadEnv: ignoring invalid line at 6: INVALID_LINE')
  })

  it('Should log success message in debug mode', () => {
    const envContent = `
      NAME="John Doe"
      ENABLED=true
    `

    createEnvFile(envContent)

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    loadEnv({ path: tempEnvPath, debug: true })

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'env variables loaded successfully!\n',
      JSON.stringify({ NAME: 'John Doe', ENABLED: true }, null, 2)
    )
  })

  it('Should log warning when file does not exist in debug mode', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

    loadEnv({ path: tempEnvPath, debug: true })

    expect(consoleWarnSpy).toHaveBeenCalledWith(`loadEnv: file not found at ${tempEnvPath}`)
  })

  it('Should support multiple env file paths', () => {
    const envPath1 = resolve(__dirname, '.env1.test')
    const envPath2 = resolve(__dirname, '.env2.test')

    const envContent1 = 'NAME="John Doe"'
    const envContent2 = 'ENABLED=true'

    fs.writeFileSync(envPath1, envContent1, { encoding: 'utf8' })
    fs.writeFileSync(envPath2, envContent2, { encoding: 'utf8' })

    loadEnv({ path: [envPath1, envPath2] })

    expect(process.env.NAME).toBe('John Doe')
    expect(process.env.ENABLED).toBe(true)

    fs.unlinkSync(envPath1)
    fs.unlinkSync(envPath2)
  })

  it('Should throw an error for invalid JSON', () => {
    const envContent = 'INVALID_JSON={key:value}'

    createEnvFile(envContent)

    expect(() => loadEnv({ path: tempEnvPath })).toThrow(LoadEnvError)
  })

  it('Should log warning when one of the paths does not exist in debug mode', () => {
    const envPath1 = resolve(__dirname, '.env1.test')
    const envPath2 = resolve(__dirname, '.env2.test')

    const envContent1 = 'NAME="John Doe"'

    fs.writeFileSync(envPath1, envContent1, { encoding: 'utf8' })

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

    loadEnv({ path: [envPath1, envPath2], debug: true })

    expect(consoleWarnSpy).toHaveBeenCalledWith(`loadEnv: file not found at ${envPath2}`)

    fs.unlinkSync(envPath1)
  })

  it('Should return parsed JSON only for objects or arrays', () => {
    const envContent = `
      VALID_OBJECT={"key":"value"}
      VALID_ARRAY=["value1","value2"]
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.VALID_OBJECT).toEqual({ key: 'value' })
    expect(process.env.VALID_ARRAY).toEqual(['value1', 'value2'])
  })

  it('Should not override existing env variables when override is false', () => {
    process.env.EXISTING_KEY = 'original_value'

    const envContent = `
      EXISTING_KEY="new_value"
      NEW_KEY="new_value"
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath, override: false })

    expect(process.env.EXISTING_KEY).toBe('original_value') // Not overridden
    expect(process.env.NEW_KEY).toBe('new_value') // Newly added
  })

  it('Should override existing env variables when override is true', () => {
    process.env.EXISTING_KEY = 'original_value'

    const envContent = `
      EXISTING_KEY="new_value"
      NEW_KEY="new_value"
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath, override: true })

    expect(process.env.EXISTING_KEY).toBe('new_value') // Overridden
    expect(process.env.NEW_KEY).toBe('new_value') // Newly added
  })

  it('Should load default .env file when path is not provided', () => {
    const defaultEnvPath = resolve(process.cwd(), '.env')
    const envContent = `
      DEFAULT_KEY="default_value"
    `

    fs.writeFileSync(defaultEnvPath, envContent, { encoding: 'utf8' })

    loadEnv()

    expect(process.env.DEFAULT_KEY).toBe('default_value')

    fs.unlinkSync(defaultEnvPath)
  })

  it('Should load from specified path when provided', () => {
    const envContent = `
      SPECIFIED_KEY="specified_value"
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.SPECIFIED_KEY).toBe('specified_value')
  })

  it('Should interpolate variables correctly', () => {
    const envContent = `
      HOME="/home/user"
      PATH="$HOME/bin"
      APP_DIR="$PATH/app"
      UNDEFINED_VAR=$UNDEFINED_ENV
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.HOME).toEqual('/home/user')
    expect(process.env.PATH).toEqual('/home/user/bin')
    expect(process.env.APP_DIR).toEqual('/home/user/bin/app')
    expect(process.env.UNDEFINED_VAR).toEqual('')
  })

  it('Should interpolate variables with mixed values', () => {
    const envContent = `
      BASE_URL="http://example.com"
      API_URL="$BASE_URL/api"
      PORT=3000
      FULL_API_URL="$API_URL:$PORT"
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.BASE_URL).toEqual('http://example.com')
    expect(process.env.API_URL).toEqual('http://example.com/api')
    expect(process.env.PORT).toEqual(3000)
    expect(process.env.FULL_API_URL).toEqual('http://example.com/api:3000')
  })

  it('Should handle nested interpolations', () => {
    const envContent = `
      VAR1="value1"
      VAR2="$VAR1-value2"
      VAR3="$VAR2-value3"
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.VAR1).toEqual('value1')
    expect(process.env.VAR2).toEqual('value1-value2')
    expect(process.env.VAR3).toEqual('value1-value2-value3')
  })

  it('Should handle undefined interpolations gracefully', () => {
    const envContent = `
      UNDEFINED_VAR="$NOT_DEFINED"
      MIXED_VAR="Hello $NOT_DEFINED!"
    `

    createEnvFile(envContent)

    loadEnv({ path: tempEnvPath })

    expect(process.env.UNDEFINED_VAR).toEqual('')
    expect(process.env.MIXED_VAR).toEqual('Hello !')
  })

  it('Should load the .env.test file when NODE_ENV=test', () => {
    const envContent = `
      TEST_KEY="test_value"
    `

    const testEnvPath = resolve(process.cwd(), '.env.test')
    fs.writeFileSync(testEnvPath, envContent, { encoding: 'utf8' })

    process.env.NODE_ENV = 'test'
    loadEnv()

    expect(process.env.TEST_KEY).toBe('test_value')

    fs.unlinkSync(testEnvPath)
  })

  it('Should load the .env.production file when NODE_ENV=production', () => {
    const envContent = `
      PROD_KEY="production_value"
    `

    const prodEnvPath = resolve(process.cwd(), '.env.production')
    fs.writeFileSync(prodEnvPath, envContent, { encoding: 'utf8' })

    process.env.NODE_ENV = 'production'
    loadEnv()

    expect(process.env.PROD_KEY).toBe('production_value')

    fs.unlinkSync(prodEnvPath)
  })

  it('Should load the .env.development file when NODE_ENV=development', () => {
    const envContent = `
      DEV_KEY="development_value"
    `

    const devEnvPath = resolve(process.cwd(), '.env.development')
    fs.writeFileSync(devEnvPath, envContent, { encoding: 'utf8' })

    process.env.NODE_ENV = 'development'
    loadEnv()

    expect(process.env.DEV_KEY).toBe('development_value')

    fs.unlinkSync(devEnvPath)
  })

  it('Should fallback to .env file when NODE_ENV is not set', () => {
    const envContent = `
      DEFAULT_KEY="default_value"
    `

    const defaultEnvPath = resolve(process.cwd(), '.env')
    fs.writeFileSync(defaultEnvPath, envContent, { encoding: 'utf8' })

    delete process.env.NODE_ENV
    loadEnv()

    expect(process.env.DEFAULT_KEY).toBe('default_value')

    fs.unlinkSync(defaultEnvPath)
  })

  it('Should not throw an error if the .env.NODE_ENV file does not exist', () => {
    process.env.NODE_ENV = 'nonexistent_env'
    expect(() => loadEnv()).not.toThrow()
  })

  it('Should prioritize the NODE_ENV specific file over the default .env', () => {
    const defaultEnvContent = `
      PRIORITY_KEY="from_default"
    `
    const nodeEnvContent = `
      PRIORITY_KEY="from_node_env"
    `

    const defaultEnvPath = resolve(process.cwd(), '.env')
    const nodeEnvPath = resolve(process.cwd(), '.env.test')
    fs.writeFileSync(defaultEnvPath, defaultEnvContent, { encoding: 'utf8' })
    fs.writeFileSync(nodeEnvPath, nodeEnvContent, { encoding: 'utf8' })

    process.env.NODE_ENV = 'test'
    loadEnv()

    expect(process.env.PRIORITY_KEY).toBe('from_node_env')

    fs.unlinkSync(defaultEnvPath)
    fs.unlinkSync(nodeEnvPath)
  })
})
