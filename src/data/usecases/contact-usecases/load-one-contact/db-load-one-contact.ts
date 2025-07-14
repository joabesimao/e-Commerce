import { Contacts } from "../../../../domain/models/contacts/contact";
import { LoadContactById } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { LoadOneContactRepository } from "../../../protocols/db/contact/load-one";

export class DbLoadOneContact implements LoadContactById {
  constructor(
    private readonly loadOneContactRepository: LoadOneContactRepository
  ) {}
  async loadOne(id: number): Promise<Contacts> {
    const loadOneContactById = await this.loadOneContactRepository.loadOne(id);
    return loadOneContactById;
  }
}
