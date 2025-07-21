import { LoadAllClient } from "../../../../domain/usescase/client/load-client/load-client";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllClientController implements Controller {
  constructor(private readonly loadAllClient: LoadAllClient) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAllClient = await this.loadAllClient.load();
      return ok(loadAllClient);
    } catch (error) {
      return serverError(error);
    }
  }
}
