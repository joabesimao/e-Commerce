import { DbLoadAllAddress } from "../../data/usecases/address-usecases/load-all-address/db-load-all-address";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { LoadAllAddressController } from "../../presentation/controllers/address/load-all-address/load-all-address-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadAllAddressController = (): Controller => {
  const loadAllAddressRepository = new AddressRepository();
  const loadAllAddress = new DbLoadAllAddress(loadAllAddressRepository);
  const loadAllAddressController = new LoadAllAddressController(loadAllAddress);
  return loadAllAddressController;
};
