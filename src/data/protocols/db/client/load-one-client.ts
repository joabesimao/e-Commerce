import { Client } from "../../../../domain/models/client/client";

export interface LoadOneClientRepository {
  loadOne(id: number): Promise<Client>;
}
