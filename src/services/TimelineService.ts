import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class TimelineService extends ServiceGenerator<ITimeline> {
  protected endpoint = api.servicePAC + "timeline/"
}
