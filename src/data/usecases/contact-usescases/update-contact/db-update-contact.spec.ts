import { DbUpdateContact } from "./db-update-contact";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { LoadContactById } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { LoadOneContactRepository } from "../../../protocols/db/contact/load-one";
import { UpdateContact } from "../../../../domain/usescase/contact/update-contact/update-contact";
import { UpdateContactRepository } from "../../../protocols/db/contact/update-contact";

interface SutTypes {
  sut: DbUpdateContact;
  updateContactRepositoryStub: UpdateContactRepository;
}

const makeContactModel = (): ContactsModel => ({
  phone: 88447744,
  phoneSecundary: 44774488,
  email: "any_email@email.com",
});

const makeContact = (): Contacts => ({
  id: 1,
  phone: 88447744,
  phoneSecundary: 44774488,
  email: "email@email.com",
});

const makeUpdateContactsRepository = (): UpdateContactRepository => {
  class UpdateContactRepositoryStub implements UpdateContactRepository {
    async update(id: number, info: Partial<Contacts>): Promise<Contacts> {
      return new Promise((resolve) => resolve(makeContact()));
    }
  }
  return new UpdateContactRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateContactRepositoryStub = makeUpdateContactsRepository();
  const sut = new DbUpdateContact(updateContactRepositoryStub);
  return {
    sut,
    updateContactRepositoryStub,
  };
};

describe("DbUpdateContact Usecase", () => {
  const id = 7;

  test("Should call UpdateContactRepository with correct values", async () => {
    const { sut, updateContactRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(updateContactRepositoryStub, "update");
    await sut.update(id, makeContact());
    expect(addSpy).toHaveBeenCalledWith(7, makeContact());
  });

  test("Should update contact on success", async () => {
    const { sut } = makeSut();
    const address = await sut.update(id, makeContact());
    expect(address).toEqual(makeContact());
  });

  test("Should throw if UpdateContactRepository throws", async () => {
    const { sut, updateContactRepositoryStub } = makeSut();
    jest
      .spyOn(updateContactRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.update(id, makeContact());
    await expect(promise).rejects.toThrow();
  });
});
