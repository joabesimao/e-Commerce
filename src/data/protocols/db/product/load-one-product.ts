import { Product } from "../../../../domain/models/product/product";

export interface LoadOneProductRepository {
  loadOne(): Promise<Product>;
}
