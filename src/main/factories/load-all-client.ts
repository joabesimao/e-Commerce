import { DbLoadAllClient } from "../../data/usecases/client-usecases/load-all-client/db-load-all-client";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { LoadAllClientController } from "../../presentation/controllers/client/load-all-client/load-all-client-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadAllClientController = (): Controller => {
  const loadAllClientRepository = new ClientRepository();
  const loadAllClient = new DbLoadAllClient(loadAllClientRepository);
  const loadAllClientController = new LoadAllClientController(loadAllClient);
  return loadAllClientController;
};
