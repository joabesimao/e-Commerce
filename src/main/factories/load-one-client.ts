import { DbLoadOneClient } from "../../data/usecases/client-usecases/load-one-client/db-load-one-client";
import { ClientRepository } from "../../infra/db/mysql/client-repository/client";
import { LoadOneClientController } from "../../presentation/controllers/client/load-one-client/load-one-client-controller";
import { Controller } from "../../presentation/protocols/controller/controller";

export const makeLoadOneClientController = (): Controller => {
  const loadOneClientRepository = new ClientRepository();
  const loadOneClient = new DbLoadOneClient(loadOneClientRepository);
  const loadOneClientController = new LoadOneClientController(loadOneClient);
  return loadOneClientController;
};
