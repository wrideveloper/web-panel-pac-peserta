import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class TimService extends ServiceGenerator<ITim> {
  protected endpoint = api.servicePAC + "tim/"
}
