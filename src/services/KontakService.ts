import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class KontakService extends ServiceGenerator<IKontak> {
  protected endpoint = api.servicePAC + "kontak/"
}
