const nodeConfig = require('../')

const { valueDataTypes } = nodeConfig

describe('nodeConfig - getConfig unit tests', () => {
  let originalEnv = null

  const paramConfig = {
    api: {
      server: {
        host: {
          envVarName: 'API_HOST',
          type: valueDataTypes.STRING,
          required: false
        }
      }
    },
    appName: {
      envVarName: 'APP_NAME',
      type: valueDataTypes.STRING,
      required: false
    }
  }

  beforeAll(() => {
    originalEnv = { ...process.env }
  })

  it('should return whole config, when path not provided', () => {
    process.env.API_HOST = '0.0.0.0'
    process.env.APP_NAME = 'demoApp'

    const { getConfig } = nodeConfig({ paramConfig })

    const config = getConfig()

    const expectedConfig = {
      api: {
        server: {
          host: '0.0.0.0'
        }
      },
      appName: 'demoApp'
    }

    expect(config).toEqual(expectedConfig)
  })

  it('should return env value, when path provided', () => {
    process.env.API_HOST = '0.0.0.0'
    process.env.APP_NAME = 'demoApp'

    const { getConfig } = nodeConfig({ paramConfig })

    const config = getConfig('api.server.host')

    expect(config).toMatch('0.0.0.0')
  })

  it('should return config object, when partial path provided', () => {
    process.env.API_HOST = '0.0.0.0'
    process.env.APP_NAME = 'demoApp'

    const { getConfig } = nodeConfig({ paramConfig })

    const config = getConfig('api')

    const expectedConfig = {
      server: {
        host: '0.0.0.0'
      }
    }

    expect(config).toEqual(expectedConfig)
  })

  it('should return undefined, when no env or default value exist for provided path', () => {
    process.env.API_HOST = '0.0.0.0'

    const { getConfig } = nodeConfig({ paramConfig })

    const config = getConfig('appName')

    expect(config).not.toBeDefined()
  })

  it('should throw error, when provided path does not exist', () => {
    process.env.API_HOST = '0.0.0.0'
    process.env.APP_NAME = 'demoApp'

    const { getConfig } = nodeConfig({ paramConfig })

    expect(() => getConfig('api.lorem')).toThrowWithMessage(Error, 'Config path "api.lorem" does not exist.')
  })

  afterEach(() => {
    // reset env values
    process.env = { ...originalEnv }
  })
})
