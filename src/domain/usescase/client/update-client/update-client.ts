import { Client } from "../../../models/client/client";

export interface LoadClient {
  load(): Promise<Client[]>;
}

export interface LoadClientById {
  loadOne(id: number): Promise<Client>;
}
