import { localLogger } from "./local-logger";
import { loadComponents } from "./utils/loadComponent";

(async function main() {
  // load two remote modules in parallel
  const [{ remoteLogger }, { get_count }] = await loadComponents([
    {
      remote: "remote",
      sharedScope: "default",
      module: "./remote-logger",
      url: "http://localhost:3002/remoteEntry.js",
    },
    {
      remote: "shared",
      sharedScope: "default",
      module: "./counter",
      url: "http://localhost:3003/remoteEntry.js",
    },
  ])();

  postMessage(`Hello from the main worker: (count = ${get_count()})`);
  localLogger();
  remoteLogger();
})();
