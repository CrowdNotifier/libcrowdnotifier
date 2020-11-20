
let logStr = "";

/**
 * A simple log class that prints the name of the object and then all messages passed to it.
 */
export class Log {
  constructor(public name: string) {
    this.name = name.padStart(30, " ") + " ";
  }

  info(...msgs) {
    const newLine = `${this.name}: ${msgs.join(" ")}`
    if (typeof(document) !== "undefined") {
      const appDiv: HTMLElement = document.getElementById("app");
      logStr += `${newLine}\n`;
      appDiv.innerHTML = `<pre>${logStr}</pre>`;
    } else {
      console.log(newLine)
    }
  }

  error(err: Error) {
    this.info("Error:", err.toString());
  }

  assert(bool: boolean, ...msgs){
    if (!bool){
      this.info("Assertion failed:", ...msgs)
    }
  }
}
