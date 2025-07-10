import { Address } from "../../../../domain/models/address/address";

export interface LoadOneAddressRepository {
  loadOne(): Promise<Address>;
}
