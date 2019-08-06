import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PengumpulanService extends ServiceGenerator<IPengumpulan> {
  protected endpoint = api.servicePAC + "pengumpulan/"
}
