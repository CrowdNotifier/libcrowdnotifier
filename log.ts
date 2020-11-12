// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

let logStr = "";

/**
 * A simple log class that prints the name of the object and then all messages passed to it.
 */
export class Log {
  constructor(public name: string) {
    this.name = name.padStart(25, " ") + " ";
  }

  info(...msgs) {
    logStr += `${this.name}: ${msgs.join(" ")}\n`;
    appDiv.innerHTML = `<pre>${logStr}</pre>`;
  }

  error(err: Error) {
    this.info("Error:", err.toString());
  }
}
