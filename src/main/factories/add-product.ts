import { DbAddProduct } from "../../data/usecases/product-usecases/add-product/db-add-product";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { AddProductController } from "../../presentation/controllers/product/add-product/add-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeAddProductController = (): Controller => {
  const productRepository = new ProductRepository();
  const addProduct = new DbAddProduct(productRepository);
  const addProductController = new AddProductController(addProduct);
  return addProductController;
};
