import { DeleteProductById } from "../../../../domain/usescase/product/delete-product/delete-product";
import { DeleteProductRepository } from "../../../protocols/db/product/delete-product";

export class DbDeleteProduct implements DeleteProductById {
  constructor(
    private readonly deleteProductRepository: DeleteProductRepository
  ) {}
  async delete(id: number): Promise<string> {
    const deleteProduct = await this.deleteProductRepository.delete(id);
    return deleteProduct;
  }
}
