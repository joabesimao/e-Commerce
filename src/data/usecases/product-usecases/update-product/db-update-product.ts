import {
  Product,
  ProductModel,
} from "../../../../domain/models/product/product";
import { UpdateProduct } from "../../../../domain/usescase/product/update-product/update-product";
import { UpdateProductRepository } from "../../../protocols/db/product/update-product";

export class DbUpdateProduct implements UpdateProduct {
  constructor(
    private readonly updateProductRepository: UpdateProductRepository
  ) {}
  async update(id: number, info: Partial<ProductModel>): Promise<Product> {
    const updateOneProduct = await this.updateProductRepository.update(
      id,
      info
    );
    return updateOneProduct;
  }
}
