import { Product } from "../../../../domain/models/product/product";

export interface LoadAllProductRepository {
  loadAll(): Promise<Product[]>;
}
