import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PesertaService extends ServiceGenerator<IPeserta> {
  protected endpoint = api.servicePAC

  public daftar(input: IPeserta, idTim: string) {
    return new Promise<IPeserta>((resolve, reject) => {
      axios
        .post(this.endpoint + `tim/${idTim}/peserta/`, input, {
          headers: this.getHeader(),
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
