import { Product } from "../../../../domain/models/product/product";
import { LoadProductById } from "../../../../domain/usescase/product/load-product/load-product";
import { LoadOneProductRepository } from "../../../protocols/db/product/load-one-product";

export class DbLoadOneProduct implements LoadProductById {
  constructor(
    private readonly loadOneProductRepository: LoadOneProductRepository
  ) {}
  async loadOne(id: number): Promise<Product> {
    const loadOneProduct = await this.loadOneProductRepository.loadOne(id);
    return loadOneProduct;
  }
}
