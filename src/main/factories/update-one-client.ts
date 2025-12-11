import { DbUpdateClient } from "../../data/usecases/client-usecases/update-client/db-update-client";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { UpdateClientController } from "../../presentation/controllers/client/update-client/update-client-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeUpdateOneClientController = (): Controller => {
  const clientRepository = new ClientRepository();
  const updateClient = new DbUpdateClient(clientRepository);
  const updateClientController = new UpdateClientController(updateClient);
  return updateClientController;
};
