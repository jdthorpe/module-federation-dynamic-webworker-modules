# Dynamic Loading of Federated Modules in Webworkers

An example of using dynamic remote federated modules in web workers, inspired
by [this example](https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host).
More specifically, the dynamic module loading utilities in
`packages/main/src/utils/` are adapted from [these utilities](https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host/app1/src/utils)

## Overview

- `packages/main` is a web app with a webworker
- `packages/remote` a utility that posts a message
- `packages/shared` a utility with a counter. The counter is used in both the main and remote modules

## usage

1. Run `yarn` to install dependencies.
2. Run `yarn serve` to serve prebuilt dist (or `yarn start` to serve from source).
