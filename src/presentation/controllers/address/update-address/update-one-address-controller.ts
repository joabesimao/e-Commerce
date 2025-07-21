import { UpdateAddress } from "../../../../domain/usescase/address/update-address/update-address";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class UpdateAddressController implements Controller {
  constructor(private readonly updateAddress: UpdateAddress) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updateAddress = await this.updateAddress.update(
        httpRequest.params.id,
        httpRequest.body
      );
      return ok(updateAddress);
    } catch (error) {
      return serverError(error);
    }
  }
}
