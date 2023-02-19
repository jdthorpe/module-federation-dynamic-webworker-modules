const messagesEl = document.getElementById("messages");
console.log("about to load worker");

const worker = new Worker(new URL("./worker.js", import.meta.url));
console.log("worker loaded");

worker.addEventListener("message", ({ data }) => {
  messagesEl.innerText += `${data}\n`;
});
