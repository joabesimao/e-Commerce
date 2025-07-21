import { LoadProductById } from "../../../../domain/usescase/product/load-product/load-product";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOneProductController implements Controller {
  constructor(private readonly loadOneProduct: LoadProductById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadOneProduct = await this.loadOneProduct.loadOne(
        httpRequest.params.id
      );
      return ok(loadOneProduct);
    } catch (error) {
      return serverError(error);
    }
  }
}
