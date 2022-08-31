/**
 * @typedef {object} NodeConfigOption
 * @property {string} envVarName - env variable name
 * @property {"boolean"|"integer"|"string"|"array<string>"|"array<int>"} type - env variable data type
 * @property {boolean} [required=false] - is env variable required
 * @property {string|number|boolean|Array<string>|Array<number>} [defaultValue] - default value, if env value not provided
 * @property {Array<string>|Array<number>} [enum] - valid env values
 */

const valueDataTypes = Object.freeze({
  BOOLEAN: 'boolean',
  INTEGER: 'integer',
  STRING: 'string',
  ARRAY_OF_STRINGS: 'array<string>',
  ARRAY_OF_INTEGERS: 'array<int>'
})

/**
 * Convert value to provided data type.
 *
 * @param  {string} dataType - data type (bool, int, string)
 * @param  {string} value - value to convert
 * @returns {*} Returns converted value.
 */
const _convertDataType = (dataType, value) => {
  if (typeof value === 'undefined') {
    return value
  }

  let convertedVal

  switch (dataType) {
    case valueDataTypes.BOOLEAN:
      convertedVal = value === 'true'
      break
    case valueDataTypes.INTEGER:
      convertedVal = parseInt(value, 10)

      if (Number.isNaN(convertedVal)) {
        throw new Error(`Failed to convert config value: value "${value}" could not be converted to integer.`)
      }
      break
    case valueDataTypes.STRING:
      convertedVal = value
      break
    case valueDataTypes.ARRAY_OF_STRINGS:
      convertedVal = value.split(',')
      break
    case valueDataTypes.ARRAY_OF_INTEGERS:
      convertedVal = value.split(',').map(arrVal => _convertDataType(valueDataTypes.INTEGER, arrVal))
      break
    default:
      throw new Error(`Failed to convert value. "${dataType}" is not a valid convert type.`)
  }

  return convertedVal
}

/**
 * Parse env configuration values and convert them from string to specific type if necessary.
 *
 * @param {Record<string, NodeConfigOption>} paramConfig - configuration options
 * @returns {Record<string, any>} Returns parsed config env values.
 */
const parseConfig = (paramConfig) => {
  const parsedConfig = Object.entries(paramConfig)
    .reduce((finalConfig, [propName, config]) => {
      if (!config.envVarName) { // not a final value, continue parsing
        finalConfig[propName] = parseConfig(config)

        return finalConfig
      }

      // parse final value
      const { envVarName, type, required, defaultValue, enum: enumValues } = config

      const value = process.env[envVarName] || defaultValue

      if (required && !value) {
        throw new Error(`Failed to parse config: Missing required config value: "${envVarName}".`)
      }

      // validate enum
      if (enumValues && !enumValues.includes(value)) {
        throw new Error(`Failed to parse config: "${value}" is not a valid "${envVarName}".`)
      }

      finalConfig[propName] = _convertDataType(type, value)

      return finalConfig
    }, {})

  return parsedConfig // Object.entries(parsedConfig).length ? parsedConfig : undefined
}

module.exports = {
  parseConfig,
  valueDataTypes
}
