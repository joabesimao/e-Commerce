import { AddProduct } from "../../../../domain/usescase/product/add-product/add-product";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddProductController implements Controller {
  constructor(private readonly addProduct: AddProduct) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addNewProduct = await this.addProduct.add(httpRequest.body);
      return ok(addNewProduct);
    } catch (error) {
      return serverError(error);
    }
  }
}
