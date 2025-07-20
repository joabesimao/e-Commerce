import { LoadContactById } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOneContactController implements Controller {
  constructor(private readonly loadOneContact: LoadContactById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadOneContact = await this.loadOneContact.loadOne(
        httpRequest.params.id
      );
      return ok(loadOneContact);
    } catch (error) {
      return serverError(error);
    }
  }
}
