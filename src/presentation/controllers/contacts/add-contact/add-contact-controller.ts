import { AddContact } from "../../../../domain/usescase/contact/add-contact/add-contact";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddContactController implements Controller {
  constructor(private readonly addContact: AddContact) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addNewContact = await this.addContact.add(httpRequest.body);
      return ok(addNewContact);
    } catch (error) {
      return serverError(error);
    }
  }
}
