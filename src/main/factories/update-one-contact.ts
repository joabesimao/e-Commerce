import { DbUpdateContact } from "../../data/usecases/contact-usecases/update-contact/db-update-contact";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { UpdateContactController } from "../../presentation/controllers/contacts/update-contact/update-contact-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeUpdateOneContactController = (): Controller => {
  const contactRepository = new ContactRepository();
  const updateContact = new DbUpdateContact(contactRepository);
  const updateContactController = new UpdateContactController(updateContact);
  return updateContactController;
};
