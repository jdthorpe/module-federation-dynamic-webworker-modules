// interface module_config { remote, shareScope, url?: string }

// declare globalThis.__webpack_modules_loading__: {[x:string]: Promise<any>}

export const getOrLoadRemote = (
  modules // : module_config[]
) =>
  new Promise((resolve, reject) => {
    // for keeping track of the modules that have begun loading.  This is done in the original with the
    // `<script webpack-data="modulename"...>` tags that load the modules, but
    // we don't have that here, so we have to do it manually with a dictionary or promises.
    globalThis.__webpack_modules_loading__ =
      globalThis.__webpack_modules_loading__ || {};

    const modules_to_load = modules.filter(
      (module) => !(module.remote in globalThis.__webpack_modules_loading__)
    );

    if (modules_to_load.length === 0)
      // all modules already started, resolve with a promise.all of the modules
      return resolve(
        Promise.all(modules.map((module) => globalThis[module.remote]))
      );

    const urls_to_load = modules_to_load
      .filter((module) => typeof globalThis[module.remote] === "undefined")
      .map((module) => module.url);

    try {
      // load the modules that need to be loaded
      importScripts(...urls_to_load);
    } catch (e) {
      return reject(e);
    }

    // initialize the modules that need to be initialized
    for (module of modules_to_load) {
      const { remote, shareScope } = module;
      if (!remote in globalThis.__webpack_modules_loading__)
        globalThis.__webpack_modules_loading__[remote] = new Promise(
          async () =>
            await globalThis[remote].init(
              // if share scope doesn't exist (like in webpack 4) then expect shareScope to be a manual object
              typeof __webpack_share_scopes__ === "undefined"
                ? // use default share scope object passed in manually
                  shareScope.default
                : // otherwise, init share scope as usual
                  __webpack_share_scopes__[shareScope]
            )
        );
    }

    return resolve(
      Promise.all(modules.map((module) => globalThis[module.remote]))
    );
  });
