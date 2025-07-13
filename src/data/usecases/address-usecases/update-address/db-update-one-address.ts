import { Address } from "../../../../domain/models/address/address";
import { UpdateAddress } from "../../../../domain/usescase/address/update-address/update-address";
import { UpdateAddressRepository } from "../../../protocols/db/address/update-address";

export class DbUpdateAddress implements UpdateAddress {
  constructor(
    private readonly updateAddressRepository: UpdateAddressRepository
  ) {}
  async update(id: number, info: Partial<Address>): Promise<Address> {
    const updateAddress = await this.updateAddressRepository.update(id, info);
    return updateAddress;
  }
}
