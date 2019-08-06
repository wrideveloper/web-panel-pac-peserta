import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class AdminService extends ServiceGenerator<IAdmin> {
  protected endpoint = api.servicePAC + "admin/"

  public login(username: string, password: string) {
    return new Promise<ILogin>((resolve, reject) => {
      axios
        .post(this.endpoint + "login", { username, password })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
