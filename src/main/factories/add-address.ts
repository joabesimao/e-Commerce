import { DbAddAddress } from "../../data/usecases/address-usecases/add-address/db-add-address";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { AddAddressController } from "../../presentation/controllers/address/add-address/add-address-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeAddAddressController = (): Controller => {
  const addressRepository = new AddressRepository();
  const addAddress = new DbAddAddress(addressRepository);
  const addAddressController = new AddAddressController(addAddress);
  return addAddressController
};
