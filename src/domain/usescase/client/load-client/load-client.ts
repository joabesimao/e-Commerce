import { Client } from "../../../models/client/client";

export interface LoadAllClient {
  load(): Promise<Client[]>;
}

export interface LoadClientById {
  loadOne(id: number): Promise<Client>;
}
