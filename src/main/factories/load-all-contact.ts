import { DbLoadAllContact } from "../../data/usecases/contact-usecases/load-all-contact/db-load-all-contact";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { LoadAllContactController } from "../../presentation/controllers/contacts/load-all-contact/load-all-contact-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadAllClientController = (): Controller => {
  const loadAllContactsRepository = new ContactRepository();
  const loadAllContact = new DbLoadAllContact(loadAllContactsRepository);
  const loadAllContactsController = new LoadAllContactController(
    loadAllContact
  );
  return loadAllContactsController;
};
