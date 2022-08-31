const dotenv = require('dotenv')

const { valueDataTypes, parseConfig } = require('./parse.js')

/** @typedef {import('./parse').NodeConfigOption } NodeConfigOption */

/**
 * Get config value for provided path.
 * When path not provided, whole config is returned.
 * If config value does not exist, undefined is returned.
 *
 * @callback GetConfig
 * @param {string} [path] - path to config param
 * @returns {object|string|number|boolean|Array<string>|Array<number>|undefined} Returns config value for provided path.
 */

/**
 * @typedef NodeConfigResult
 * @property {GetConfig} getConfig - function, which finds config value for provided path.
 */

/**
 * Parse config by provided paramConfig and return config getter helper function.
 *
 * @param {object} options - config options
 * @param {string} options.envPath - path to env file
 * @param {Record<string, NodeConfigOption>} options.paramConfig - configuration parameters config
 * @returns {NodeConfigResult} Returns config getter helper function.
 */
const nodeConfig = (options) => {
  if (!options?.paramConfig) {
    throw new Error('Failed to initialize nodeConfig: "paramConfig" should be provided.')
  }

  const dotenvOptions = options.envPath ? { path: options.envPath } : undefined

  const config = dotenv.config(dotenvOptions)

  if (config.error) {
    throw config.error
  }

  const parsedConfig = parseConfig(options.paramConfig)

  /** @type {GetConfig} */
  const getConfig = (path) => {
    if (!path) {
      return parsedConfig
    }

    const pathParts = path.split('.')

    return pathParts.reduce((currVal, pathPart) => {
      if (!Object.prototype.hasOwnProperty.call(currVal, pathPart)) {
        throw new Error(`Config path "${path}" does not exist.`)
      }

      return currVal[pathPart]
    }, parsedConfig)
  }

  return {
    getConfig
  }
}

nodeConfig.valueDataTypes = valueDataTypes

module.exports = nodeConfig
