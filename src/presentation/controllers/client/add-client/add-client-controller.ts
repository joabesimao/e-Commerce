import { AddClient } from "../../../../domain/usescase/client/add-client/add-client";
import {
  ok,
  serverError,
} from "../../../../presentation/helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddClientController implements Controller {
  constructor(private readonly AddClient: AddClient) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addNewClient = await this.AddClient.add(httpRequest.body);
      return ok(addNewClient);
    } catch (error) {
      return serverError(error);
    }
  }
}
