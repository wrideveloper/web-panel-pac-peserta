import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class MediaPartnerService extends ServiceGenerator<IMediaPartner> {
  protected endpoint = api.servicePAC + "mediaPartner/"
}
