import { DbAddContact } from "./db-add-contact";
import { AddContactRepository } from "../../../protocols/db/contact/add-contact";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { AddContactModel } from "../../../../domain/usescase/contact/add-contact/add-contact";

interface SutTypes {
  sut: DbAddContact;
  addContactRepositoryStub: AddContactRepository;
}

const makeAddContact = (): ContactsModel => ({
  phone: 88447744,
  phoneSecundary: 44774488,
  email: "any_email@email.com",
});

const makeContact = (): Contacts => ({
  id: 1,
  phone: 88447744,
  phoneSecundary: 44774488,
  email: "any_email@email.com",
});

const makeContactsRepository = (): AddContactRepository => {
  class ContactRepositoryStub implements AddContactRepository {
    async add(contact: AddContactModel): Promise<Contacts> {
      return new Promise((resolve) => resolve(makeContact()));
    }
  }
  return new ContactRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addContactRepositoryStub = makeContactsRepository();
  const sut = new DbAddContact(addContactRepositoryStub);
  return {
    sut,
    addContactRepositoryStub,
  };
};

describe("DbAddContact Usecase", () => {
  test("Should call AddContactRepository with correct values", async () => {
    const { sut, addContactRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addContactRepositoryStub, "add");
    await sut.add(makeAddContact());
    expect(addSpy).toHaveBeenCalledWith({
      phone: 88447744,
      phoneSecundary: 44774488,
      email: "any_email@email.com",
    });
  });

  test("Should add a contact on success", async () => {
    const { sut } = makeSut();
    const contact = await sut.add(makeAddContact());
    expect(contact).toEqual(makeContact());
  });

  test("Should throw if AddContactRepository throws", async () => {
    const { sut, addContactRepositoryStub } = makeSut();
    jest
      .spyOn(addContactRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeContact());
    await expect(promise).rejects.toThrow();
  });
});
