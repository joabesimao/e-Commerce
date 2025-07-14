import { Product } from "../../../../domain/models/product/product";
import { LoadAllProduct } from "../../../../domain/usescase/product/load-product/load-product";
import { LoadAllProductRepository } from "../../../protocols/db/product/load-all-product";

export class DbLoadAllProduct implements LoadAllProduct {
  constructor(
    private readonly loadAllProductRepository: LoadAllProductRepository
  ) {}
  async load(): Promise<Product[]> {
    const loadAllProduct = await this.loadAllProductRepository.loadAll();
    return loadAllProduct;
  }
}
