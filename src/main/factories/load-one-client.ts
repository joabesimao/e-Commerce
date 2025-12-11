import { DbLoadAllAddress } from "../../data/usecases/address-usecases/load-all-address/db-load-all-address";
import { DbLoadOneAddress } from "../../data/usecases/address-usecases/load-one-address/db-load-one-address";
import { DbLoadOneClient } from "../../data/usecases/client-usecases/load-one-client/db-load-one-client";
import { DbLoadOneProduct } from "../../data/usecases/product-usecases/load-one-product/db-load-one-product";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { LoadAllAddressController } from "../../presentation/controllers/address/load-all-address/load-all-address-controller";
import { LoadOneAddressController } from "../../presentation/controllers/address/load-one-address/load-one-address-controller";
import { LoadOneClientController } from "../../presentation/controllers/client/load-one-client/load-one-client-controller";
import { LoadOneProductController } from "../../presentation/controllers/product/load-one-product/load-one-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadOneClientController = (): Controller => {
  const loadOneClientRepository = new ClientRepository();
  const loadOneClient = new DbLoadOneClient(loadOneClientRepository);
  const loadOneClientController = new LoadOneClientController(loadOneClient);
  return loadOneClientController;
};
