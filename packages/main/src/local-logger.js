import { loadComponent } from "./utils/loadComponent";

// This toggle provided just to show that the dynamic module loading is
// compatible with static loading...
const useDynamicImport = false;

let counter_module;
if (useDynamicImport) {
  counter_module = loadComponent(
    "shared",
    "default",
    "./counter",
    "http://localhost:3003/remoteEntry.js"
  )();
} else {
  // this has to be done manually for now...
  importScripts("//localhost:3003/remoteEntry.js");
  counter_module = import("shared/counter");
}

export async function localLogger() {
  const { get_count } = await counter_module;
  postMessage(`Hello from the local logger (count = ${get_count()})`);
}
