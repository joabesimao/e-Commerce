import { DeleteClientById } from "../../../../domain/usescase/client/delete-client/delete-client";
import { DeleteClientRepository } from "../../../protocols/db/client/delete-client";

export class DbDeleteClient implements DeleteClientById {
  constructor(
    private readonly deleteClientRepository: DeleteClientRepository
  ) {}
  async delete(id: number): Promise<string> {
    const deleteClient = await this.deleteClientRepository.delete(id);
    return deleteClient;
  }
}
