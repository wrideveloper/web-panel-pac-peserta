import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

const id = (JSON.parse(localStorage.getItem("authUser") || "{}") as ITim)._id

export class PengumpulanService extends ServiceGenerator<IPengumpulan> {
  protected endpoint = api.servicePAC + `tim/${id}/pengumpulan/`
}
