import { Client } from "../../../../domain/models/client/client";

export interface UpdateClientRepository {
  update(id: number, info: Partial<Client>): Promise<Client>;
}
