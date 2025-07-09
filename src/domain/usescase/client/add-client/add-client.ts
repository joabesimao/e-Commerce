import { Client } from "../../../models/client/client";

export interface AddClientModel {
  name: string;
  document: string;
  cpf: string;
}

export interface AddClient {
  add(client: AddClientModel): Promise<Client>;
}
