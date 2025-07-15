import { Contacts } from "../../../../domain/models/contacts/contact";
import {
  AddContact,
  AddContactModel,
} from "../../../../domain/usescase/contact/add-contact/add-contact";
import { AddContactRepository } from "../../../protocols/db/contact/add-contact";

export class DbAddContact implements AddContact {
  constructor(private readonly addContactRepository: AddContactRepository) {}
  async add(contact: AddContactModel): Promise<Contacts> {
    const addContact = await this.addContactRepository.add(contact);
    return addContact;
  }
}
