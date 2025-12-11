import { DbLoadOneAddress } from "../../data/usecases/address-usecases/load-one-address/db-load-one-address";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { LoadOneAddressController } from "../../presentation/controllers/address/load-one-address/load-one-address-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadOneAddressController = (): Controller => {
  const loadOneAddressRepository = new AddressRepository();
  const loadOneAddress = new DbLoadOneAddress(loadOneAddressRepository);
  const loadOneAddressController = new LoadOneAddressController(loadOneAddress);
  return loadOneAddressController;
};
