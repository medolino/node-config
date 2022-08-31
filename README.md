# `@medolino/node-config`

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/v/@medolino/node-config.svg)](https://www.npmjs.com/package/@medolino/node-config)

`@medolino/node-config` is a helper tool that deals with env configuration in an organized way.

## How It Works

When calling initialization function, user provides a configuration parameter settings, which are used to **validate**, **cast** and **organize** parsed `process.env` values in a tree structure. After initialization `getConfig` helper function is exposed and can be used to retrieve specific configuration value or set of values.

As [detenv](https://www.npmjs.com/package/dotenv) is used under the hood, environment variables can also be stored in a `.env` file.

## Install

Install locally using npm:

```bash
npm i @medolino/node-config --save
```

## Usage

Create a `.env` file in the root of your project and store desired env variables:

```
API_HOST = 0.0.0.0
API_PORT = 3000
DB_HOST = 0.0.0.0
DB_PORT = 27018
LOGGER_LEVEL = debug
```

Initialize config and use `getConfig` function to get specific config values:

```js
const nodeConfig = require('@medolino/node-config')

const paramConfig = {
  api: {
    server: {
      host: {
        envVarName: 'API_HOST', // env variable name
        type: nodeConfig.valueDataTypes.STRING, // data type to cast to
        required: false, // is env value required
        defaultValue: 'localhost' // use this value, when env value not provided
      },
      port: {
        envVarName: 'API_PORT',
        type: nodeConfig.valueDataTypes.INTEGER,
        required: false,
        defaultValue: 4000
      }
    },
    db: {
      host: {
        envVarName: 'DB_HOST',
        type: nodeConfig.valueDataTypes.STRING,
        required: false,
        defaultValue: 'localhost'
      },
      port: {
        envVarName: 'DB_PORT',
        type: nodeConfig.valueDataTypes.INTEGER,
        required: false,
        defaultValue: 27017
      }
    },
    logger: {
      level: {
        envVarName: 'LOGGER_LEVEL',
        type: nodeConfig.valueDataTypes.STRING,
        required: true,
        defaultValue: 'info',
        enum: ['debug', 'info', 'fatal']
      }
    }
  }
}

const { getConfig } = nodeConfig({ paramConfig })

const apiConfig = getConfig('api')

console.log(apiConfig)

/*
{
  "server": {
    "host": "0.0.0.0",
    "port": 3000
  },
  "db": {
    "host": "0.0.0.0",
    "port": 27017
  },
  "logger": {
    "level": "debug"
  }
}
*/

const dbConfig = getConfig('api.db')
console.log(dbConfig)

/*
{
  "host": "0.0.0.0",
  "port": 27017
}
*/

const loggerEnabled = getConfig('api.logger.level')
console.log(loggerEnabled)

/*
"debug"
*/
```

### Overriding values from `.env`

You can override any env value, defined in `.env` using a parameter on the CLI command line when starting the application:

```bash
LOGGER_LEVEL=fatal npm run start
```

### Supported value data types

During initialization, env values are casted to desired data type.

A list of supported data types:
- boolean,
- integer,
- string,
- array of strings,
- array of integers

See: [`nodeConfig.valueDataTypes`](docs/api.md#node-config-value-types)

## Documentation
- [API Documentation](docs/api.md)
