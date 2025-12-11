import { DbLoadOneProduct } from "../../data/usecases/product-usecases/load-one-product/db-load-one-product";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { LoadOneProductController } from "../../presentation/controllers/product/load-one-product/load-one-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadOneProductController = (): Controller => {
  const loadOneProductRepository = new ProductRepository();
  const loadOneProduct = new DbLoadOneProduct(loadOneProductRepository);
  const loadOneProductController = new LoadOneProductController(loadOneProduct);
  return loadOneProductController;
};
