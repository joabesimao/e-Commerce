import { Product } from "../../../../domain/models/product/product";

export interface UpdateProductRepository {
  update(id: number, info: Partial<Product>): Promise<Product>;
}
