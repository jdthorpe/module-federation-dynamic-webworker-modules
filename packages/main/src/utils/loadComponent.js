import { getOrLoadRemote } from "./getOrLoadRemote";

export const loadComponent = (remote, sharedScope, module, url) => {
  return async () => {
    await getOrLoadRemote([{ remote, sharedScope, url }]);
    const container = globalThis[remote];
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
};

export const loadComponents = (modules) => {
  return async () => {
    await getOrLoadRemote(modules);
    return Promise.all(
      modules.map(async ({ remote, module }) => {
        const container = globalThis[remote];
        const factory = await container.get(module);
        const Module = factory();
        return Module;
      })
    );
  };
};
