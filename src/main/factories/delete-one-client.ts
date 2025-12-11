import { DbDeleteClient } from "../../data/usecases/client-usecases/delete-client/db-delete-client";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { DeleteClientController } from "../../presentation/controllers/client/delete-client/delete-client-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeDeleteOneClientController = (): Controller => {
  const clientRepository = new ClientRepository();
  const deleteClient = new DbDeleteClient(clientRepository);
  const deleteClientController = new DeleteClientController(deleteClient);
  return deleteClientController;
};
