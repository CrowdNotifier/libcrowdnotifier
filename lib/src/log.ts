
let logStr = '';

/**
 * A simple log class that prints the name of the object and
 * then all messages passed to it.
 */
export class Log {
  constructor(public name: string) {
    this.name = name.padStart(30, ' ') + ' ';
  }

  info(...msgs: any[]) {
    const newLine = `${this.name}: ${msgs.join(' ')}`;
    // @ts-ignore
    if (typeof(document) !== 'undefined') {
      // @ts-ignore
      const appDiv: HTMLElement = document.getElementById('app');
      logStr += `${newLine}\n`;
      appDiv.innerHTML = `<pre>${logStr}</pre>`;
    } else {
      console.log(newLine);
    }
  }

  panic(err: Error) {
    this.info('Panic stack:', err.stack);
    // @ts-ignore
    process.exit(1);
  }

  error(err: Error) {
    this.info('Error:', err.toString());
  }

  assertTrue(result: boolean, ...msgs: any[]) {
    if (result !== true) {
      throw new Error([...msgs].join(':'));
    }
  }

  assertFalse(result: boolean, ...msgs: any[]) {
    if (result !== false) {
      throw new Error([...msgs].join(':'));
    }
  }

  assert(a: any, b: any, ...msgs: any[]) {
    this.test(true, a, b, ...msgs);
  }

  reject(a: any, b: any, ...msgs: any[]) {
    this.test(false, a, b, ...msgs);
  }

  throws(fn: () => void, ...msgs: any[]) {
    try {
      fn();
      this.panic(new Error(`${fn} didn't throw error. ${msgs.join(':')}`));
    } catch (e) {}
  }

  test(expect: boolean, a: any, b: any, ...msgs: any[]) {
    const [jsona, jsonb] = [JSON.stringify(a), JSON.stringify(b)];
    const result = jsona === jsonb;
    if (result != expect) {
      throw new Error(`Assertion ( '${jsona}' === '${jsonb}' ) === ` +
      `'${expect}' failed: ` + [...msgs].join(':'));
    }
  }
}
