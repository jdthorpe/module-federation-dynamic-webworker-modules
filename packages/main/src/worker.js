import { localLogger } from "./local-logger";
import { loadComponent } from "./utils/loadComponent";

(async function main() {
  // without this call the webpack runtime will try to load this via a <script> tag, but webworkers have no DOM access.
  importScripts("//localhost:3002/remoteEntry.js");

  // log from a local module
  localLogger();

  const { remoteLogger } = await loadComponent(
    "remote",
    "default",
    "./remote-logger",
    "http://localhost:3002/remoteEntry.js"
  )();
  remoteLogger();
})();
