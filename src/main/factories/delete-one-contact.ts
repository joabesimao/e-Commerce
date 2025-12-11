import { DbDeleteContact } from "../../data/usecases/contact-usecases/delete-contact/db-delete-contact";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { DeleteContactController } from "../../presentation/controllers/contacts/delete-contact/delete-contact-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeDeleteOneContactController = (): Controller => {
  const contactRepository = new ContactRepository();
  const deleteContact = new DbDeleteContact(contactRepository);
  const deleteContactController = new DeleteContactController(deleteContact);
  return deleteContactController;
};
