import { LoadAllProduct } from "../../../../domain/usescase/product/load-product/load-product";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllProductController implements Controller {
  constructor(private readonly loadAllProduct: LoadAllProduct) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAllProduct = await this.loadAllProduct.load();
      return ok(loadAllProduct);
    } catch (error) {
      return serverError(error);
    }
  }
}
