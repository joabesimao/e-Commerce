import { Client } from "../../../models/client/client";

export interface UpdateClient {
  update(id: number, info: Partial<Client>): Promise<Client>;
}
