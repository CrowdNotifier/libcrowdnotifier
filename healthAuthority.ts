import { HealthAuthorityBackend } from "healthAuthorityBackend";
import { Location } from "location";
import { Log } from "./log";
import { Internet } from "./internet";

export class HealthAuthority {
  private log: Log;
  constructor(
    private internet: Internet,
    private urlPurple: string,
    public name: string
  ) {
    this.log = new Log(`HealthAuthority{${name}}`);
    this.log.info("Created");
  }

  async getCrowdCode(
    venue: Location,
    start: number,
    end: number
  ): Promise<string> {
    this.log.info("Triggering notification about:", venue.name, venue.location);
    const url = new URL(`${this.urlPurple}/${HealthAuthorityBackend.pathGetCrowdCode}`);
    Object.entries({
      name: venue.name,
      location: venue.location,
      start,
      end
    }).forEach(([k, v]) => url.searchParams.set(k, v.toString()));
    return this.internet.get(url);
  }
}
