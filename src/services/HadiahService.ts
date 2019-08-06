import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class HadiahService extends ServiceGenerator<IHadiah> {
  protected endpoint = api.servicePAC + "hadiah/"
}
