import { DeleteContactById } from "../../../../domain/usescase/contact/delete-contact/delete-contact";
import { DeleteContactRepository } from "../../../protocols/db/contact/delete-contact";

export class DbDeleteContact implements DeleteContactById {
  constructor(
    private readonly deleteContactRepository: DeleteContactRepository
  ) {}
  async delete(id: number): Promise<string> {
    const deleteOneContact = await this.deleteContactRepository.delete(id);
    return deleteOneContact;
  }
}
