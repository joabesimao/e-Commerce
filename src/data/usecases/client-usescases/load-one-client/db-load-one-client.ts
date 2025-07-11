import { Client } from "../../../../domain/models/client/client";
import {
  LoadClient,
  LoadClientById,
} from "../../../../domain/usescase/client/load-client/load-client";
import { LoadOneClientRepository } from "../../../protocols/db/client/load-one-client";

export class DbLoadOneClient implements LoadClientById {
  constructor(
    private readonly loadOneClientRepository: LoadOneClientRepository
  ) {}
  async loadOne(id: number): Promise<Client> {
    const loadOneClient = await this.loadOneClientRepository.loadOne(id);
    return loadOneClient;
  }
}
