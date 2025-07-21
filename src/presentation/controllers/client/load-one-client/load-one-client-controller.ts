import { LoadClientById } from "../../../../domain/usescase/client/load-client/load-client";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOneClientController implements Controller {
  constructor(private readonly loadOneClient: LoadClientById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadOneClient = await this.loadOneClient.loadOne(
        httpRequest.params.id
      );
      return ok(loadOneClient);
    } catch (error) {
      return serverError(error);
    }
  }
}
