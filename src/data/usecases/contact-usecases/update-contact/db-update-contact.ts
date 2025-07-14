import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { LoadContactById } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { UpdateContact } from "../../../../domain/usescase/contact/update-contact/update-contact";
import { LoadOneContactRepository } from "../../../protocols/db/contact/load-one";
import { UpdateContactRepository } from "../../../protocols/db/contact/update-contact";

export class DbUpdateContact implements UpdateContact {
  constructor(
    private readonly updateContactRepository: UpdateContactRepository
  ) {}
  async update(id: number, info: Partial<ContactsModel>): Promise<Contacts> {
    const updateContact = await this.updateContactRepository.update(id, info);
    return updateContact;
  }
}
