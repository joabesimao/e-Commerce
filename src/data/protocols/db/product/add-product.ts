import { AddProductModel } from "../../../../domain/usescase/product/add-product/add-product";
import { Product } from "../../../../domain/models/product/product";

export interface AddProductRepository {
  add(client: AddProductModel): Promise<Product>;
}
