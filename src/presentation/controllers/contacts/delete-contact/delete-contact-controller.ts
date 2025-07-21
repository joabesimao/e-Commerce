import { DeleteContactById } from "../../../../domain/usescase/contact/delete-contact/delete-contact";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class DeleteContactController implements Controller {
  constructor(private readonly deleteContact: DeleteContactById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const deleteContact = await this.deleteContact.delete(
        httpRequest.params.id
      );
      return ok(deleteContact);
    } catch (error) {
      return serverError(error);
    }
  }
}
