import { AddClientModel } from "../../../../domain/usescase/client/add-client/add-client";
import { Client } from "../../../../domain/models/client/client";

export interface AddClientRepository {
  add(client: AddClientModel): Promise<Client>;
}
