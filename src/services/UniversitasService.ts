import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class UniversitasService extends ServiceGenerator<IUniversitas> {
  protected endpoint = api.servicePAC + "universitas/"
}
