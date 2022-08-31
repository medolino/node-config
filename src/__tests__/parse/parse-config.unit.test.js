const { valueDataTypes, parseConfig } = require('../../parse.js')

describe('parse - parseConfig unit tests', () => {
  let originalEnv = null

  beforeAll(() => {
    originalEnv = { ...process.env }
  })

  it('should return parsed config preserving config paths', () => {
    process.env.API_HOST = '0.0.0.0'
    process.env.APP_NAME = 'demoApp'

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

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      api: {
        server: {
          host: '0.0.0.0'
        }
      },
      appName: 'demoApp'
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should return parsed config with default values, when no env value provided', () => {
    const paramConfig = {
      api: {
        server: {
          host: {
            envVarName: 'API_HOST',
            type: valueDataTypes.STRING,
            required: false,
            defaultValue: '127.0.0.1'
          }
        }
      },
      appName: {
        envVarName: 'APP_NAME',
        type: valueDataTypes.STRING,
        required: false,
        defaultValue: 'testApp'
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      api: {
        server: {
          host: '127.0.0.1'
        }
      },
      appName: 'testApp'
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should return config structure with undefined values, when no env or default values provided', () => {
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

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      api: {
        server: {
          host: undefined
        }
      },
      appName: undefined
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should include config path with undefined value, when no env or default value for this path provided', () => {
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
        required: false,
        defaultValue: 'testApp'
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      api: {
        server: {
          host: undefined
        }
      },
      appName: 'testApp'
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should parse integer value', () => {
    const paramConfig = {
      pageLimit: {
        envVarName: 'PAGE_LIMIT',
        type: valueDataTypes.INTEGER,
        required: true,
        defaultValue: '100'
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      pageLimit: 100
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should parse boolean value', () => {
    const paramConfig = {
      isEnabled: {
        envVarName: 'IS_ENABLED',
        type: valueDataTypes.BOOLEAN,
        required: true,
        defaultValue: 'true'
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      isEnabled: true
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should parse array of string values', () => {
    const paramConfig = {
      validValues: {
        envVarName: 'VALID_VALUES',
        type: valueDataTypes.ARRAY_OF_STRINGS,
        required: true,
        defaultValue: 'lorem,ipsum,amet,true,10'
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      validValues: ['lorem', 'ipsum', 'amet', 'true', '10']
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should parse array of integer values', () => {
    const paramConfig = {
      validValues: {
        envVarName: 'VALID_VALUES',
        type: valueDataTypes.ARRAY_OF_INTEGERS,
        required: true,
        defaultValue: '0,-10,10,0.5'
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      validValues: [0, -10, 10, 0]
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should parse valid enum value', () => {
    const paramConfig = {
      logLevel: {
        envVarName: 'LOG_LEVEL',
        type: valueDataTypes.STRING,
        required: false,
        defaultValue: 'info',
        enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']
      }
    }

    const parsedConfig = parseConfig(paramConfig)

    const expectedConfig = {
      logLevel: 'info'
    }

    expect(parsedConfig).toEqual(expectedConfig)
  })

  it('should throw error, when value could not be converted to integer', () => {
    const paramConfig = {
      pageLimit: {
        envVarName: 'PAGE_LIMIT',
        type: valueDataTypes.INTEGER,
        required: true,
        defaultValue: 'test'
      }
    }

    expect(() => parseConfig(paramConfig)).toThrowWithMessage(Error, 'Failed to convert config value: value "test" could not be converted to integer.')
  })

  it('should throw error, when array value could not be converted to integer', () => {
    const paramConfig = {
      validValues: {
        envVarName: 'VALID_VALUES',
        type: valueDataTypes.ARRAY_OF_INTEGERS,
        required: true,
        defaultValue: '0,-10,test,0.5'
      }
    }

    expect(() => parseConfig(paramConfig)).toThrowWithMessage(Error, 'Failed to convert config value: value "test" could not be converted to integer.')
  })

  it('should throw error, when invalid convert type provided', () => {
    const paramConfig = {
      validValues: {
        envVarName: 'VALID_VALUES',
        type: 'customType',
        required: true,
        defaultValue: '0,-10,test,0.5'
      }
    }

    expect(() => parseConfig(paramConfig)).toThrowWithMessage(Error, 'Failed to convert value. "customType" is not a valid convert type.')
  })

  it('should throw error, when invalid enum value provided', () => {
    const paramConfig = {
      logLevel: {
        envVarName: 'LOG_LEVEL',
        type: valueDataTypes.STRING,
        required: false,
        defaultValue: 'lorem',
        enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']
      }
    }

    expect(() => parseConfig(paramConfig)).toThrowWithMessage(Error, 'Failed to parse config: "lorem" is not a valid "LOG_LEVEL".')
  })

  it('should throw error, when missing required env value and no default value exists', () => {
    const paramConfig = {
      appName: {
        envVarName: 'APP_NAME',
        type: valueDataTypes.STRING,
        required: true
      }
    }

    expect(() => parseConfig(paramConfig)).toThrowWithMessage(Error, 'Failed to parse config: Missing required config value: "APP_NAME".')
  })

  afterEach(() => {
    // reset env values
    process.env = { ...originalEnv }
  })
})
