import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";

export interface LoadAllContactRepository {
  loadAll(): Promise<Contacts[]>;
}
