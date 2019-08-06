import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class SupportedByService extends ServiceGenerator<ISupportedBy> {
  protected endpoint = api.servicePAC + "supportedBy/"
}
