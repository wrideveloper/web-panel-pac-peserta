import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class JenisPengumpulanService extends ServiceGenerator<
  IJenisPengumpulan
> {
  protected endpoint = api.servicePAC + "jenisPengumpulan/"
}
