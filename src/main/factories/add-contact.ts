import { DbAddContact } from "../../data/usecases/contact-usecases/add-contact/db-add-contact";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { AddContactController } from "../../presentation/controllers/contacts/add-contact/add-contact-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeAddContactController = (): Controller => {
  const contactRepository = new ContactRepository();
  const addContact = new DbAddContact(contactRepository);
  const addContactController = new AddContactController(addContact);
  return addContactController;
};
