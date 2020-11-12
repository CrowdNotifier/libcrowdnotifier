import { Log } from "./log";

export interface IServer {
  Get(path: string, search: string): Promise<string>;
  Post(path: string, search: string, data: string): Promise<string>;
}

/**
 * Putting it all together: instead of passing the classes to the different methods,
 * the servers are registered here, so that they can be called through this method.
 */
export class Internet {
  private servers = new Map<string, IServer>();
  private log = new Log("Internet");
  constructor() {}

  /**
   * Allows the service to be registered under a given domain name.
   */
  register(url: URL, server: IServer) {
    this.servers.set(url.host, server);
    this.log.info("Registered", url.host);
  }

  async get(url: URL): Promise<string> {
    this.log.info("GET", url.href);
    const { host, pathname, search } = url;
    const path = pathname.replace(/^\//, "");
    if (!this.servers.has(host)) {
      throw new Error("No server registered for this domain");
    }
    const result = await this.servers.get(host).Get(path, search);
    return result;
  }

  async post(url: URL, data = ""): Promise<string> {
    this.log.info("POST", url.href, "with data", data);
    const { host, pathname, search } = url;
    const path = pathname.replace(/^\//, "");
    if (!this.servers.has(host)) {
      throw new Error("No server registered for this domain");
    }
    const result = await this.servers.get(host).Post(path, search, data);
    return result;
  }
}
