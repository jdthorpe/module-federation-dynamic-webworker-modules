const messagesEl = document.getElementById("messages");

const worker = new Worker(new URL("./worker.js", import.meta.url));

worker.addEventListener("message", ({ data }) => {
  messagesEl.innerText += `${data}\n`;
});
