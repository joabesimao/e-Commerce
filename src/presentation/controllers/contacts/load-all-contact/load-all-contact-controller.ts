import { LoadAllContact } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllContactController implements Controller {
  constructor(private readonly loadAllContact: LoadAllContact) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAllContact = await this.loadAllContact.load();
      return ok(loadAllContact);
    } catch (error) {
      return serverError(error);
    }
  }
}
