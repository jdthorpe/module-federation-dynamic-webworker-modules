export const getOrLoadRemote = (
  remote,
  shareScope,
  remoteFallbackUrl = undefined
) =>
  new Promise((resolve, reject) => {
    // check if remote exists on globalThis
    if (globalThis[remote])
      // remote already instantiated, resolve
      return resolve();

    if (!remoteFallbackUrl)
      // no remote and no fallback exist, reject
      return reject(`Cannot Find Remote ${remote} to inject`);

    try {
      importScripts(remoteFallbackUrl);
    } catch (e) {
      return reject(e);
    }

    // check if it was initialized
    if (globalThis[remote].__initialized) return resolve();
    (async () => {
      await globalThis[remote].init(
        // if share scope doesn't exist (like in webpack 4) then expect shareScope to be a manual object
        typeof __webpack_share_scopes__ === "undefined"
          ? // use default share scope object passed in manually
            shareScope.default
          : // otherwise, init share scope as usual
            __webpack_share_scopes__[shareScope]
      );
      // mark remote as initialized
      globalThis[remote].__initialized = true;
      // resolve promise so marking remote as loaded
      resolve();
    })();
  });
