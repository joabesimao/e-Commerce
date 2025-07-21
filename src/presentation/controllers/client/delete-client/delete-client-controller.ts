import { DeleteClientById } from "../../../../domain/usescase/client/delete-client/delete-client";
import { LoadClientById } from "../../../../domain/usescase/client/load-client/load-client";
import { UpdateClient } from "../../../../domain/usescase/client/update-client/update-client";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class DeleteClientController implements Controller {
  constructor(private readonly deleteClient: DeleteClientById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const deleteteClient = await this.deleteClient.delete(
        httpRequest.params.id
      );
      return ok(deleteteClient);
    } catch (error) {
      return serverError(error);
    }
  }
}
