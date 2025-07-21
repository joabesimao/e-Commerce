import { Address } from "../../../../domain/models/address/address";
import { LoadAllAddress } from "../../../../domain/usescase/address/load-address/load-address";
import { LoadAllAddressRepository } from "../../../protocols/db/address/load-all-address";

export class DbLoadAllAddress implements LoadAllAddress {
  constructor(
    private readonly loadAllAddressRepository: LoadAllAddressRepository
  ) {}
  async load(): Promise<Address[]> {
    const loadAllAddress = await this.loadAllAddressRepository.loadAll();
    return loadAllAddress;
  }
}
