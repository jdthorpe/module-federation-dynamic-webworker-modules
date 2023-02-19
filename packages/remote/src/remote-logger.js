import { loadComponent } from "./utils/loadComponent";

// this has to be done manually for now...
// importScripts("//localhost:3003/remoteEntry.js");

// const counter_module = import("shared/counter");
const counter_module = loadComponent(
  "shared",
  "default",
  "./counter",
  "http://localhost:3003/remoteEntry.js"
)();

export async function remoteLogger() {
  const { get_count } = await counter_module;
  postMessage(`Hello from the remote logger (count = ${get_count()})`);
  console.log("globalThis", globalThis);
}
