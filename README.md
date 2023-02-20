# Dynamic Loading of Federated Modules in Web workers

An example of using dynamic remote federated modules in web workers, inspired
by [this example](https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host).
More specifically, the dynamic module loading utilities in
`packages/main/src/utils/` are adapted from [these utilities](https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host/app1/src/utils)

## Overview

- `packages/main` is a web app with a web worker
- `packages/remote` a utility that posts a message
- `packages/shared` a utility with a counter. The counter is used in both the main and remote modules

## API Notes.

There are two separate re-implementations of [these utilities](https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host/app1/src/utils)
from the reference example, because [these lines](https://github.com/module-federation/module-federation-examples/blob/a90f3355505f36ad5667c874e1761d563efeb3b6/dynamic-system-host/app1/src/utils/getOrLoadRemote.js#L44-L53)
provide an api that cannot be exactly recapitulated in a web worker. Specifically:

- The code in `packages/remote/src/utils/getOrLoadComponent.js` is
  essentially just a transliteration or the original code from the reference
  implementation. Specifically, it has exactly the same API, but suffers from
  the fact that `importScripts` is **synchronous** which means the worker is
  not free to load another component in paralell.

- The code in `packages/main/src/utils/getOrLoadComponent.js` allows for
  (down)loading multiple packages in parallel, taking advantage of the fact
  that additional arguments to `importscripts()` are downloaded in parallel,
  much like the multiple `<script>` tags that would be created with multiple
  asynchronous calls to the original method. This requires a bit more work to
  keep track of the already-in-progress downloads (using a dictionary of
  promises instead of a document full of `<script>` tags). This is exposed in
  the `loadComponents()` function, illustrated in [`packages/main/src/worker.js`](https://github.com/jdthorpe/module-federation-dynamic-webworker-modules/blob/main/packages/main/src/worker.js).

## usage

1. Run `yarn` to install dependencies.
2. Run `yarn build` to build the packages.
3. Run `yarn serve` to serve prebuilt dist (or `yarn start` to serve from source).
4. Visit the app at `localhost:3001`
