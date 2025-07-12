import { Address } from "../../../../domain/models/address/address";
import { LoadAddressById } from "../../../../domain/usescase/address/load-address/load-address";

export class DbLoadOneAddress implements LoadAddressById {
  constructor(private readonly loadOneAddressRepository: LoadAddressById) {}
  async loadOne(id: number): Promise<Address> {
    const loadOneAddress = await this.loadOneAddressRepository.loadOne(id);
    return loadOneAddress;
  }
}
