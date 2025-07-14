import { Contacts } from "../../../../domain/models/contacts/contact";
import { LoadAllContact } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { LoadAllContactRepository } from "../../../protocols/db/contact/load-all-contact";

export class DbLoadAllContact implements LoadAllContact {
  constructor(
    private readonly loadAllContactRepository: LoadAllContactRepository
  ) {}
  async load(): Promise<Contacts[]> {
    const loadAllContact = await this.loadAllContactRepository.loadAll();
    return loadAllContact;
  }
}
