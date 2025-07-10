import { Contacts } from "../../../../domain/models/contacts/contact";

export interface UpdateContactRepository {
  update(id: number, info: Partial<Contacts>): Promise<Contacts>;
}
