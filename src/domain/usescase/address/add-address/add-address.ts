import { Address } from "../../../models/address/address";

export interface AddAddressModel {
  street: string;
  neighborhood: string;
  numberHouse: number;
  reference: string;
  cep: string;
  city: string;
}

export interface AddClient {
  add(client: AddAddressModel): Promise<Address>;
}
