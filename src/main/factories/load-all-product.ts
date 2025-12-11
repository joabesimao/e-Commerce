import { DbLoadAllAddress } from "../../data/usecases/address-usecases/load-all-address/db-load-all-address";
import { DbLoadAllProduct } from "../../data/usecases/product-usecases/load-all-product/db-load-all-product";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { LoadAllAddressController } from "../../presentation/controllers/address/load-all-address/load-all-address-controller";
import { LoadAllProductController } from "../../presentation/controllers/product/load-all-product/load-all-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadAllProductController = (): Controller => {
  const loadAllProductRepository = new ProductRepository();
  const loadAllProduct = new DbLoadAllProduct(loadAllProductRepository);
  const loadAllProductController = new LoadAllProductController(loadAllProduct);
  return loadAllProductController;
};
