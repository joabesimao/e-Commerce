import { AddContactRepository } from "../../../../data/protocols/db/contact/add-contact";
import { DeleteContactRepository } from "../../../../data/protocols/db/contact/delete-contact";
import { LoadAllContactRepository } from "../../../../data/protocols/db/contact/load-all-contact";
import { LoadOneContactRepository } from "../../../../data/protocols/db/contact/load-one";
import { UpdateContactRepository } from "../../../../data/protocols/db/contact/update-contact";
import { Contacts } from "../../../../domain/models/contacts/contact";
import { AddContactModel } from "../../../../domain/usescase/contact/add-contact/add-contact";
import { prisma } from "../helper/index";

export class ContactRepository
  implements
    AddContactRepository,
    LoadAllContactRepository,
    LoadOneContactRepository,
    UpdateContactRepository,
    DeleteContactRepository
{
  async add(contact: AddContactModel): Promise<Contacts> {
    const { email, phone, phoneSecundary } = contact;
    const addContact = await prisma.contact.create({
      data: { email: email, phone: phone, phoneSecundary: phoneSecundary },
    });
    return addContact as unknown as Contacts;
  }

  async update(id: number, info: Partial<Contacts>): Promise<Contacts> {
    const updateContact = await prisma.address.update({
      where: {
        id: Number(id),
      },
      data: { ...info },
    });
    return updateContact;
  }

  async loadOne(id: number): Promise<Contacts> {
    const oneContact = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });
    return oneContact;
  }

  async loadAll(): Promise<Contacts[]> {
    const loadAllContact = await prisma.contact.findMany({
      select: {
        cep: true,
        city: true,
        neighborhood: true,
        numberHouse: true,
        reference: true,
        street: true,
      },
    });
    return loadAllContact;
  }

  async delete(id: number): Promise<string> {
    await prisma.contact.delete({
      where: {
        id: Number(id),
      },
    });
    return "Deletado com Sucesso!";
  }
}
