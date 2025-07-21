import { AddAddress } from "../../../../domain/usescase/address/add-address/add-address";
import {
  LoadAddressById,
  LoadAllAddress,
} from "../../../../domain/usescase/address/load-address/load-address";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOneAddressController implements Controller {
  constructor(private readonly loadOneAddress: LoadAddressById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAddress = await this.loadOneAddress.loadOne(
        httpRequest.params.id
      );
      return ok(loadAddress);
    } catch (error) {
      return serverError(error);
    }
  }
}
