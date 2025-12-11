import { DbLoadOneContact } from "../../data/usecases/contact-usecases/load-one-contact/db-load-one-contact";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { LoadOneContactController } from "../../presentation/controllers/contacts/load-one-contact/load-one-contact-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadOneContactController = (): Controller => {
  const loadOneContactRepository = new ContactRepository();
  const loadOneContact = new DbLoadOneContact(loadOneContactRepository);
  const loadOneContactController = new LoadOneContactController(loadOneContact);
  return loadOneContactController;
};
