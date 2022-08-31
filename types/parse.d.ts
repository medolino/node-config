export type NodeConfigOption = {
    /**
     * - env variable name
     */
    envVarName: string;
    /**
     * - env variable data type
     */
    type: "boolean" | "integer" | "string" | "array<string>" | "array<int>";
    /**
     * - is env variable required
     */
    required?: boolean | undefined;
    /**
     * - default value, if env value not provided
     */
    defaultValue?: string | number | boolean | string[] | number[] | undefined;
    /**
     * - valid env values
     */
    enum?: string[] | number[] | undefined;
};
/**
 * Parse env configuration values and convert them from string to specific type if necessary.
 *
 * @param {Record<string, NodeConfigOption>} paramConfig - configuration options
 * @returns {Record<string, any>} Returns parsed config env values.
 */
export function parseConfig(paramConfig: Record<string, NodeConfigOption>): Record<string, any>;
/**
 * @typedef {object} NodeConfigOption
 * @property {string} envVarName - env variable name
 * @property {"boolean"|"integer"|"string"|"array<string>"|"array<int>"} type - env variable data type
 * @property {boolean} [required=false] - is env variable required
 * @property {string|number|boolean|Array<string>|Array<number>} [defaultValue] - default value, if env value not provided
 * @property {Array<string>|Array<number>} [enum] - valid env values
 */
export const valueDataTypes: Readonly<{
    BOOLEAN: "boolean";
    INTEGER: "integer";
    STRING: "string";
    ARRAY_OF_STRINGS: "array<string>";
    ARRAY_OF_INTEGERS: "array<int>";
}>;
