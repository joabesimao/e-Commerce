import { Address } from "../../../../domain/models/address/address";

export interface UpdateAddressRepository {
  update(id: number, info: Partial<Address>): Promise<Address>;
}
