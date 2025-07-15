import { Contacts } from "../../../models/contacts/contact";

export interface AddContactModel {
  phone: number;
  phoneSecundary: number;
  email: string;
}

export interface AddContact {
  add(contact: AddContactModel): Promise<Contacts>;
}
