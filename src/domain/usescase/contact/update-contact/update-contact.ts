import { Contacts, ContactsModel } from "../../../models/contacts/contact";

export interface UpdateContact {
  update(id: number, info: Partial<ContactsModel>): Promise<Contacts>;
}
