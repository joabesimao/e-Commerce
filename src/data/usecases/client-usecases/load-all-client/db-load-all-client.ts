import { Client } from "../../../../domain/models/client/client";
import { LoadClient } from "../../../../domain/usescase/client/load-client/load-client";
import { LoadAllClientRepository } from "../../../protocols/db/client/load-all-client";

export class DbLoadAllClient implements LoadClient {
  constructor(
    private readonly loadAllClientRepository: LoadAllClientRepository
  ) {}
  async load(): Promise<Client[]> {
    const loadAllClients = await this.loadAllClientRepository.loadAll();
    return loadAllClients;
  }
}
