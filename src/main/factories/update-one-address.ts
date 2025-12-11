import { DbUpdateAddress } from "../../data/usecases/address-usecases/update-address/db-update-one-address";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";

import { UpdateAddressController } from "../../presentation/controllers/address/update-address/update-one-address-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeUpdateOneAddressController = (): Controller => {
  const addressRepository = new AddressRepository();
  const updateAddress = new DbUpdateAddress(addressRepository);
  const updateAddressController = new UpdateAddressController(updateAddress);
  return updateAddressController;
};
