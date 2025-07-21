import { UpdateContact } from "../../../../domain/usescase/contact/update-contact/update-contact";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class UpdateContactController implements Controller {
  constructor(private readonly updateContact: UpdateContact) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updateContact = await this.updateContact.update(
        httpRequest.params.id,
        httpRequest.body
      );
      return ok(updateContact);
    } catch (error) {
      return serverError(error);
    }
  }
}
