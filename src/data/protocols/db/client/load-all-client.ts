import { Client } from "../../../../domain/models/client/client";

export interface LoadAllClientRepository {
  loadAll(): Promise<Client[]>;
}
