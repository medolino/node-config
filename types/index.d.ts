export = nodeConfig;
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
declare function nodeConfig(options: {
    envPath: string;
    paramConfig: Record<string, NodeConfigOption>;
}): NodeConfigResult;
declare namespace nodeConfig {
    export { valueDataTypes, NodeConfigOption, GetConfig, NodeConfigResult };
}
type NodeConfigOption = import('./parse').NodeConfigOption;
type NodeConfigResult = {
    /**
     * - function, which finds config value for provided path.
     */
    getConfig: GetConfig;
};
import { valueDataTypes } from "./parse.js";
/**
 * Get config value for provided path.
 * When path not provided, whole config is returned.
 * If config value does not exist, undefined is returned.
 */
type GetConfig = (path?: string | undefined) => object | string | number | boolean | Array<string> | Array<number> | undefined;
