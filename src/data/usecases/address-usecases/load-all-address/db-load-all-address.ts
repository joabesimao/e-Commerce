import { Address } from "../../../../domain/models/address/address";
import {
  AddAddress,
  AddAddressModel,
} from "../../../../domain/usescase/address/add-address/add-address";
import { LoadAddress } from "../../../../domain/usescase/address/load-address/load-address";
import { AddAddressRepository } from "../../../protocols/db/address/add-address";
import { LoadAllAddressRepository } from "../../../protocols/db/address/load-all-address";

export class DbLoadAllAddress implements LoadAddress {
  constructor(
    private readonly loadAllAddressRepository: LoadAllAddressRepository
  ) {}
  async load(): Promise<Address[]> {
    const loadAllAddress = await this.loadAllAddressRepository.loadAll();
    return loadAllAddress;
  }
}
