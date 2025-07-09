import { Contacts } from "../../../models/contacts/contact";

export interface LoadContact {
  load(): Promise<Contacts[]>;
}

export interface LoadContactById {
  loadOne(id: number): Promise<Contacts>;
}
