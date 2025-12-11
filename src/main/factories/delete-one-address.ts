import { DbDeleteAddress } from "../../data/usecases/address-usecases/delete-address/db-delete-address";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { DeleteAddressController } from "../../presentation/controllers/address/delete-address/delete-one-address-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeDeleteOneAddressController = (): Controller => {
  const addressRepository = new AddressRepository();
  const deleteAddress = new DbDeleteAddress(addressRepository);
  const deleteAddressController = new DeleteAddressController(deleteAddress);
  return deleteAddressController;
};
