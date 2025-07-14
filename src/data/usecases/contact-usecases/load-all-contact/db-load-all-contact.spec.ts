import { DbLoadAllContact } from "./db-load-all-contact";
import { Contacts } from "../../../../domain/models/contacts/contact";
import { LoadAllContactRepository } from "../../../protocols/db/contact/load-all-contact";

interface SutTypes {
  sut: DbLoadAllContact;
  loadAllContactRepositoryStub: LoadAllContactRepository;
}

const makeContactList = (): Contacts[] => [
  {
    id: 1,
    phone: 88447744,
    phoneSecundary: 44774488,
    email: "email@email.com",
  },
  {
    id: 2,
    phone: 88447743,
    phoneSecundary: 44774487,
    email: "any_email@email.com",
  },
  {
    id: 3,
    phone: 88447741,
    phoneSecundary: 44774481,
    email: "other_email@email.com",
  },
];

const makeAllContactsRepository = (): LoadAllContactRepository => {
  class ContactRepositoryStub implements LoadAllContactRepository {
    async loadAll(): Promise<Contacts[]> {
      return new Promise((resolve) => resolve(makeContactList()));
    }
  }
  return new ContactRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAllContactRepositoryStub = makeAllContactsRepository();
  const sut = new DbLoadAllContact(loadAllContactRepositoryStub);
  return {
    sut,
    loadAllContactRepositoryStub,
  };
};

describe("DbLoadAllContact Usecase", () => {
  test("Should call LoadAllContactRepository with correct values", async () => {
    const { sut, loadAllContactRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadAllContactRepositoryStub, "loadAll");
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should load all contact on success", async () => {
    const { sut } = makeSut();
    const contact = await sut.load();
    expect(contact).toEqual(makeContactList());
  });

  test("Should throw if LoadAllContactRepository throws", async () => {
    const { sut, loadAllContactRepositoryStub } = makeSut();
    jest
      .spyOn(loadAllContactRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
