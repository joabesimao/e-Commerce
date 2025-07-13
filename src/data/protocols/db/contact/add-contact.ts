import { AddContactModel } from "../../../../domain/usescase/contact/add-contact/add-contact";
import { Contacts } from "../../../../domain/models/contacts/contact";

export interface AddContactRepository {
  add(contact: AddContactModel): Promise<Contacts>;
}
