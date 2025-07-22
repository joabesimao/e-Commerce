import { Address } from "../../../../domain/models/address/address";

export interface LoadOneAddressRepository {
  loadOne(id: number): Promise<Address>;
}
