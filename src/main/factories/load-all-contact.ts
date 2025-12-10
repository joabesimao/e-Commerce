import { DbLoadAllAddress } from "../../data/usecases/address-usecases/load-all-address/db-load-all-address";
import { DbLoadAllClient } from "../../data/usecases/client-usecases/load-all-client/db-load-all-client";
import { DbLoadAllContact } from "../../data/usecases/contact-usecases/load-all-contact/db-load-all-contact";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { LoadAllAddressController } from "../../presentation/controllers/address/load-all-address/load-all-address-controller";
import { LoadAllClientController } from "../../presentation/controllers/client/load-all-client/load-all-client-controller";
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
