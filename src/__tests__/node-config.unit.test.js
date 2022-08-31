const nodeConfig = require('../')

const { valueDataTypes } = nodeConfig

describe('nodeConfig - unit tests', () => {
  let originalEnv = null

  beforeAll(() => {
    originalEnv = { ...process.env }
  })

  it('should return getConfig function', () => {
    const paramConfig = {
      appName: {
        envVarName: 'APP_NAME',
        type: valueDataTypes.STRING,
        required: false
      }
    }

    const config = nodeConfig({ paramConfig })

    const expectedConfig = {
      getConfig: expect.any(Function)
    }

    expect(config).toEqual(expectedConfig)
  })

  it('should call dotenv.config with custom path, when provided', () => {
    jest.doMock('dotenv')

    const nodeConfigWithMock = require('../')
    const dotenvMock = require('dotenv')

    const options = {
      envPath: '.custom-env',
      paramConfig: {
        appName: {
          envVarName: 'APP_NAME',
          type: valueDataTypes.STRING,
          required: false
        }
      }
    }

    nodeConfigWithMock(options)

    expect(dotenvMock.config).toHaveBeenCalledTimes(1)
    expect(dotenvMock.config).toHaveBeenNthCalledWith(1, { path: '.custom-env' })
  })

  it('should throw error, when no paramConfig provided', () => {
    expect(() => nodeConfig()).toThrowWithMessage(Error, 'Failed to initialize nodeConfig: "paramConfig" should be provided.')
  })

  it('should throw error, when dotenv init encounters error', () => {
    jest.mock('dotenv')

    const dotenvMock = require('dotenv')

    dotenvMock.config.mockImplementationOnce(() => {
      const error = new Error('dotenv init failed')

      return { error }
    })

    const nodeConfigWithMock = require('../')

    const paramConfig = {
      appName: {
        envVarName: 'APP_NAME',
        type: valueDataTypes.STRING,
        required: false
      }
    }

    expect(() => nodeConfigWithMock({ paramConfig })).toThrowWithMessage(Error, 'dotenv init failed')
  })

  afterEach(() => {
    // reset env values
    process.env = { ...originalEnv }
  })
})
