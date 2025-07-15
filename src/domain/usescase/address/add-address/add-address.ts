import { Address } from "../../../models/address/address";

export interface AddAddressModel {
  street: string;
  neighborhood: string;
  numberHouse: number;
  reference: string;
  cep: string;
  city: string;
}

export interface AddAddress {
  add(address: AddAddressModel): Promise<Address>;
}
