import { Address } from "../../../models/address/address";

export interface LoadAddress {
  load(): Promise<Address[]>;
}

export interface LoadAddressById {
  loadOne(id: number): Promise<Address>;
}
