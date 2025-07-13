import { DbLoadOneContact } from "./db-load-one-contact";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { LoadContactById } from "../../../../domain/usescase/contact/load-contact/load-contact";
import { LoadOneContactRepository } from "../../../protocols/db/contact/load-one";

interface SutTypes {
  sut: DbLoadOneContact;
  loadOneContactRepositoryStub: LoadContactById;
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

const makeOneContactsRepository = (): LoadOneContactRepository => {
  class LoadOneContactRepositoryStub implements LoadOneContactRepository {
    async loadOne(id: number): Promise<Contacts> {
      return new Promise((resolve) => resolve(makeContact()));
    }
  }
  return new LoadOneContactRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadOneContactRepositoryStub = makeOneContactsRepository();
  const sut = new DbLoadOneContact(loadOneContactRepositoryStub);
  return {
    sut,
    loadOneContactRepositoryStub,
  };
};

describe("DbLoadOneContact Usecase", () => {
  const id = 7;

  test("Should call LoadOneContactRepository with correct values", async () => {
    const { sut, loadOneContactRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(loadOneContactRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(addSpy).toHaveBeenCalledWith(7);
  });

  test("Should load one contact on success", async () => {
    const { sut } = makeSut();
    const address = await sut.loadOne(id);
    expect(address).toEqual(makeContact());
  });

  test("Should throw if LoadAllContactRepository throws", async () => {
    const { sut, loadOneContactRepositoryStub } = makeSut();
    jest
      .spyOn(loadOneContactRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadOne(id);
    await expect(promise).rejects.toThrow();
  });
});
