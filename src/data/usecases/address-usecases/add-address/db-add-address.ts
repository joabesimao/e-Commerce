import { Address } from "../../../../domain/models/address/address";
import {
  AddAddress,
  AddAddressModel,
} from "../../../../domain/usescase/address/add-address/add-address";
import { AddAddressRepository } from "../../../protocols/db/address/add-address";

export class DbAddAddress implements AddAddress {
  constructor(private readonly addAddressRepository: AddAddressRepository) {}
  async add(address: AddAddressModel): Promise<Address> {
    const addAddress = await this.addAddressRepository.add(address);
    return addAddress;
  }
}
