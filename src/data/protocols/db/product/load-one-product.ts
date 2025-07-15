import { Product } from "../../../../domain/models/product/product";

export interface LoadOneProductRepository {
  loadOne(id: number): Promise<Product>;
}
