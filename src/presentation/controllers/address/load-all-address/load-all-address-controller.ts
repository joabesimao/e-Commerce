import { AddAddress } from "../../../../domain/usescase/address/add-address/add-address";
import { LoadAllAddress } from "../../../../domain/usescase/address/load-address/load-address";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllAddressController implements Controller {
  constructor(private readonly loadAllAddress: LoadAllAddress) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAddressList = await this.loadAllAddress.load();
      return ok(loadAddressList);
    } catch (error) {
      return serverError(error);
    }
  }
}
