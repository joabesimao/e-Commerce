import { AddAddress } from "../../../../domain/usescase/address/add-address/add-address";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddAddressController implements Controller {
  constructor(private readonly addAddress: AddAddress) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addNewAddress = await this.addAddress.add(httpRequest.body);
      return ok(addNewAddress);
    } catch (error) {
      return serverError(error);
    }
  }
}
