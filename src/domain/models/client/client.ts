import { Address, AddressModel } from "../address/address";
import { ContactsModel } from "../contacts/contact";

export interface ClientModel {
  name: string;
  document: string;
  cpf: string;
}

export interface Client {
  id: number;
  name: string;
  cpf: string;
  address: AddressModel;
  contact: ContactsModel;
}
