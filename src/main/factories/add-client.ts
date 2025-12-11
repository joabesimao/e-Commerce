import { DbAddClient } from "../../data/usecases/client-usecases/add-client/db-add-client";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { AddClientController } from "../../presentation/controllers/client/add-client/add-client-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeAddClientController = (): Controller => {
  const clientRepository = new ClientRepository();
  const addClient = new DbAddClient(clientRepository);
  const addClientController = new AddClientController(addClient);
  return addClientController;
};
