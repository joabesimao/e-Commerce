import { DbDeleteProduct } from "../../data/usecases/product-usecases/delete-product/db-delete-product";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { DeleteteProductController } from "../../presentation/controllers/product/delete-product/delete-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeDeleteOneProductController = (): Controller => {
  const productRepository = new ProductRepository();
  const deleteProduct = new DbDeleteProduct(productRepository);
  const deleteProductController = new DeleteteProductController(deleteProduct);
  return deleteProductController;
};
