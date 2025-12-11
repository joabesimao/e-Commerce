import { DbLoadAllAddress } from "../../data/usecases/address-usecases/load-all-address/db-load-all-address";
import { DbLoadOneAddress } from "../../data/usecases/address-usecases/load-one-address/db-load-one-address";
import { DbLoadOneClient } from "../../data/usecases/client-usecases/load-one-client/db-load-one-client";
import { DbLoadOneContact } from "../../data/usecases/contact-usecases/load-one-contact/db-load-one-contact";
import { DbLoadOneProduct } from "../../data/usecases/product-usecases/load-one-product/db-load-one-product";
import { AddressRepository } from "../../infra/db/mysql/address-repository/address";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { ContactRepository } from "../../infra/db/mysql/contacts-repository/contacts";
import { ProductRepository } from "../../infra/db/mysql/product-repository/product";
import { LoadAllAddressController } from "../../presentation/controllers/address/load-all-address/load-all-address-controller";
import { LoadOneAddressController } from "../../presentation/controllers/address/load-one-address/load-one-address-controller";
import { LoadOneClientController } from "../../presentation/controllers/client/load-one-client/load-one-client-controller";
import { LoadOneContactController } from "../../presentation/controllers/contacts/load-one-contact/load-one-contact-controller";
import { LoadOneProductController } from "../../presentation/controllers/product/load-one-product/load-one-product-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadOneContactController = (): Controller => {
  const loadOneContactRepository = new ContactRepository();
  const loadOneContact = new DbLoadOneContact(loadOneContactRepository);
  const loadOneContactController = new LoadOneContactController(loadOneContact);
  return loadOneContactController;
};
