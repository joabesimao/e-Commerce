import { DeleteAddressById } from "../../../../domain/usescase/address/delete-address/delete-address";
import { DeleteAddressRepository } from "../../../protocols/db/address/delete-address";

export class DbDeleteAddress implements DeleteAddressById {
  constructor(
    private readonly deleteAddressRepository: DeleteAddressRepository
  ) {}
  async delete(id: number): Promise<string> {
    const deletedAddress = await this.deleteAddressRepository.delete(id);
    return deletedAddress;
  }
}
