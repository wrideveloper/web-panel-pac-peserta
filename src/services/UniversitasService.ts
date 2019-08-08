import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class UniversitasService extends ServiceGenerator<IPeserta> {
  protected endpoint = api.servicePAC + "universitas/"
}
