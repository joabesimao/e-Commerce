import { Address } from "../../../models/address/address";

export interface LoadAllAddress {
  load(): Promise<Address[]>;
}

export interface LoadAddressById {
  loadOne(id: number): Promise<Address>;
}
