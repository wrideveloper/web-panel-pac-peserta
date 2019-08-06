import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class StatusService extends ServiceGenerator<IStatus> {
  protected endpoint = api.servicePAC + "status/"
}
