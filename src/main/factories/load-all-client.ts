import { DbLoadAllAddress } from "../../data/usecases/address-usecases/load-all-address/db-load-all-address";
import { DbLoadAllClient } from "../../data/usecases/client-usecases/load-all-client/db-load-all-client";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { LoadAllAddressController } from "../../presentation/controllers/address/load-all-address/load-all-address-controller";
import { LoadAllClientController } from "../../presentation/controllers/client/load-all-client/load-all-client-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadAllClientController = (): Controller => {
  const loadAllClientRepository = new ClientRepository();
  const loadAllClient = new DbLoadAllClient(loadAllClientRepository);
  const loadAllClientController = new LoadAllClientController(loadAllClient);
  return loadAllClientController;
};
