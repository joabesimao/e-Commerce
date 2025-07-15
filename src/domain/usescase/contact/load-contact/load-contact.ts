import { Contacts } from "../../../models/contacts/contact";

export interface LoadAllContact {
  load(): Promise<Contacts[]>;
}

export interface LoadContactById {
  loadOne(id: number): Promise<Contacts>;
}
