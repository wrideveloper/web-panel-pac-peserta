import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PesertaService extends ServiceGenerator<IPeserta> {
  protected endpoint = api.servicePAC

  public daftar(input: Partial<IPeserta>, idTim: string) {
    return new Promise<IPeserta>((resolve, reject) => {
      axios
        .post(this.endpoint + `tim/${idTim}/peserta/`, input, {
          headers: this.getHeader(),
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public getAnggotaTim() {
    const idTim = (JSON.parse(localStorage.getItem("authUser")!) as ITim)._id
    return new Promise<IPeserta[]>((resolve, reject) => {
      axios
        .get(this.endpoint + `tim/${idTim}/peserta/`, {
          headers: this.getHeader(),
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
