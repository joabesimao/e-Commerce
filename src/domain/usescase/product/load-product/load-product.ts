import { Product } from "../../../models/product/product";

export interface LoadProduct {
  load(): Promise<Product[]>;
}

export interface LoadProductById {
  loadOne(id: number): Promise<Product>;
}
