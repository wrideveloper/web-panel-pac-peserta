import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PesertaService extends ServiceGenerator<IPeserta> {
  protected endpoint = api.servicePAC + "peserta/"
}
