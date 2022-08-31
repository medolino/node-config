# API Documentation

- [nodeConfig(options) => NodeConfigInstance](#node-config-instance)
  - [options](#node-config-options)
- [NodeConfigInstance](#node-config-instance)
  - [NodeConfigInstance.getConfig](#node-config-instance-get-config)
- [nodeConfig.valueDataTypes](#node-config-value-data-types)

<a id="node-config"></a>

## `nodeConfig(options) => NodeConfigInstance`

`nodeConfig` is an init function, which parses and validates env values and casts them to desired data type. Env values are stored in tree like structure according to provided configuration. Parsed values can be retrieved using exposed [NodeConfigInstance.getConfig](#ode-config-get-config) function.

`nodeConfig` function takes one required argument [`options`](#node-config-options) and returns a [NodeConfigInstance](#node-config-instance).

<a id="node-config-options"></a>

### `options` (Object)

<a id="node-config-options-env-path"></a>

#### `options.envPath` (String)

Path to env file.

Required: `false`
Default: `.env`

<a id="node-config-options-param-config"></a>

#### `options.paramConfig` (Object)

Configuration parameters config.

Required: `true`

Example:
```js
const paramConfig = {
  api: {
    server: {
      host: {
        envVarName: 'API_HOST',
        type: 'string', // use -> nodeConfig.valueDataTypes.STRING
        required: false,
        defaultValue: 'localhost'
      },
      port: {
        envVarName: 'API_PORT',
        type: 'integer', // use -> nodeConfig.valueDataTypes.INTEGER,
        required: false,
        defaultValue: 4000
      }
    }
  }
}
```

<a id="node-config-options-param-config-config-param-name"></a>

##### `options.paramConfig.[optionalPath].{configParamName}` (Object)

Configuration parameter config.

<a id="node-config-options-param-config-config-param-name-env-var-name"></a>

##### `options.paramConfig.[optionalPath].{configParamName}.envVarName` (String)

Env variable name.

Required: `true`

<a id="node-config-options-param-config-config-param-name-type"></a>

##### `options.paramConfig.[optionalPath].{configParamName}.type` (String)

Env variable data type, to cast env value to.

Required: `true`
Available values: see [`nodeConfig.valueDataTypes`](#node-config-value-data-types)

<a id="node-config-options-param-config-config-param-name-required"></a>

##### `options.paramConfig.[optionalPath].{configParamName}.required` (String)

Is env variable required.

Required: `false`
Default: `false`

<a id="node-config-options-param-config-config-param-name-default-value"></a>

##### `options.paramConfig.[optionalPath].{configParamName}.defaultValue` (String|Number|Boolean|Array&lt;string&gt;|Array&lt;number&gt;)

Default value, if env value not provided.

Required: `false`

<a id="node-config-options-param-config-config-param-name-enum"></a>

##### `options.paramConfig.[optionalPath].{configParamName}.enum` (Array&lt;string&gt;|Array&lt;number&gt;)

Valid env values.

Required: `false`

<a id="node-config-instance"></a>

## NodeConfigInstance

NodeConfigInstance is an object returned by the [`nodeConfig`](#node-config) function.

Successful initialization returns an object containing [config](#snf-config) helper function.

<a id="node-config-instance-get-config"></a>

### `NodeConfigInstance.getConfig(path) => Object|String|Number|Boolean|Array<string>|Array<number>|undefined`

`NodeConfigInstance.getConfig` is a helper function, which retrieves configuration value for provided path.<br>
When no `path` provided, full configuration is returned.<br>
If configuration path does not exist, function throws an error.

Function takes one optional argument [`path`](#node-config-instance-get-config-path) and returns a configuration value or set of values.

#### `path` (String)

Path to config value.

Required: `false`
Example: `app.server.host`

<a id="node-config-value-data-types"></a>

## `nodeConfig.valueDataTypes` (Object)

Available config value data types.

<a id="node-config-value-data-types-boolean"></a>

### `nodeConfig.valueDataTypes.BOOLEAN` (String)

When selected, env value will be parsed to boolean.

<a id="node-config-value-data-types-integer"></a>

### `nodeConfig.valueDataTypes.INTEGER` (String)

When selected, env value will be parsed to integer.

<a id="node-config-value-data-types-string"></a>

### `nodeConfig.valueDataTypes.STRING` (String)

When selected, env value will not be changed.

<a id="node-config-value-data-types-array-of-strings"></a>

### `nodeConfig.valueDataTypes.ARRAY_OF_STRINGS` (String)

When selected, env value will be parsed to array of strings.

<a id="node-config-value-data-types-array-of-integers"></a>

### `nodeConfig.valueDataTypes.ARRAY_OF_INTEGERS` (String)

When selected, env value will be parsed to array of integers.