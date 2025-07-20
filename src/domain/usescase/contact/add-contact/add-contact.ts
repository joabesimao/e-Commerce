import { Contacts } from "../../../models/contacts/contact";

export interface AddContactModel {
  phone: string;
  phoneSecundary: string;
  email: string;
}

export interface AddContact {
  add(contact: AddContactModel): Promise<Contacts>;
}
