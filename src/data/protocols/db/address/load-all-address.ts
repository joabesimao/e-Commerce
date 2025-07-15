import { Address } from "../../../../domain/models/address/address";

export interface LoadAllAddressRepository {
  loadAll(): Promise<Address[]>;
}
