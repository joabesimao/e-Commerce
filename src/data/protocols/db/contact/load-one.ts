import { Address } from "../../../../domain/models/address/address";
import { Contacts } from "../../../../domain/models/contacts/contact";

export interface LoadOneContactRepository {
  loadOne(id: number): Promise<Contacts>;
}
