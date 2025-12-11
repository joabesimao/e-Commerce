import { DbUpdateProduct } from "../../data/usecases/product-usecases/update-product/db-update-product";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { UpdateProductController } from "../../presentation/controllers/product/update-product/update-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeUpdateOneProductController = (): Controller => {
  const productRepository = new ProductRepository();
  const updateProduct = new DbUpdateProduct(productRepository);
  const updateProductController = new UpdateProductController(updateProduct);
  return updateProductController;
};
