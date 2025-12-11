import { DbLoadAllProduct } from "../../data/usecases/product-usecases/load-all-product/db-load-all-product";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { LoadAllProductController } from "../../presentation/controllers/product/load-all-product/load-all-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadAllProductController = (): Controller => {
  const loadAllProductRepository = new ProductRepository();
  const loadAllProduct = new DbLoadAllProduct(loadAllProductRepository);
  const loadAllProductController = new LoadAllProductController(loadAllProduct);
  return loadAllProductController;
};
