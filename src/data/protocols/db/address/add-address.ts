import { AddAddressModel } from "../../../../domain/usescase/address/add-address/add-address";
import { Address } from "../../../../domain/models/address/address";

export interface AddAddressRepository {
  add(client: AddAddressModel): Promise<Address>;
}
