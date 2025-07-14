import { Client } from "../../../../domain/models/client/client";
import { UpdateClient } from "../../../../domain/usescase/client/update-client/update-client";
import { UpdateClientRepository } from "../../../protocols/db/client/update-client";

export class DbUpdateClient implements UpdateClient {
  constructor(
    private readonly updateClientRepository: UpdateClientRepository
  ) {}
  async update(id: number, info: Partial<Client>): Promise<Client> {
    const updateClient = await this.updateClientRepository.update(id, info);
    return updateClient;
  }
}
