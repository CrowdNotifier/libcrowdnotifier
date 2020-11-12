import { Internet } from "./internet";
import { Log } from "./log";

export interface ITrace {
  privKey: Uint8Array;
  start: number;
  end: number;
}

export class CrowdBackend {
  public static pathGetTraces = "getTraces";
  public static pathPostTrace = "trace";
  private traces: ITrace[] = [];
  private log: Log;
  constructor(private internet: Internet, public host: string) {
    internet.register(new URL(host), this);
    this.log = new Log(`CrowdBackend{${host}}`);
  }

  private storeTrace(trace: ITrace) {
    this.traces.push(trace);
  }

  async Get(path: string, search: string): Promise<string> {
    switch (path) {
      case CrowdBackend.pathGetTraces:
        return JSON.stringify(this.traces);
    }
    throw new Error("Unknown path");
  }

  async Post(path: string, search: string, data: string): Promise<string> {
    switch (path) {
      case CrowdBackend.pathPostTrace:
        this.traces.push(JSON.parse(data));
        return;
    }
    throw new Error("Unknown path");
  }
}
