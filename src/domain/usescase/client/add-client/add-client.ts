import { AddressModel } from "../../../models/address/address";
import { Client } from "../../../models/client/client";
import { ContactsModel } from "../../../models/contacts/contact";

export interface AddClientModel {
  name: string;
  cpf: string;
  address: AddressModel;
  contact: ContactsModel;
}

export interface AddClient {
  add(client: AddClientModel): Promise<Client>;
}
