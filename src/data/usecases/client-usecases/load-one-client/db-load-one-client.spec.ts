import { DbLoadOneClient } from "./db-load-one-client";
import { Client } from "../../../../domain/models/client/client";
import { LoadOneClientRepository } from "../../../protocols/db/client/load-one-client";

interface SutTypes {
  sut: DbLoadOneClient;
  loadOneClientRepositoryStub: LoadOneClientRepository;
}

const makeClient = (): Client => ({
  id: 1,
  name: "any_name",
  cpf: "any_cpf",
  address: {
    cep: "any_cep",
    city: "any_city",
    neighborhood: "any_neighborhood",
    numberHouse: 1,
    reference: "any_ref",
    street: "any_street",
  },
  contact: {
    email: "any_email",
    phone: "55555555",
    phoneSecundary: "6666666",
  },
});

const makeLoadOneClientRepository = (): LoadOneClientRepository => {
  class LoadOneClientRepositoryStub implements LoadOneClientRepository {
    async loadOne(id: number): Promise<Client> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new LoadOneClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadOneClientRepositoryStub = makeLoadOneClientRepository();
  const sut = new DbLoadOneClient(loadOneClientRepositoryStub);
  return {
    sut,
    loadOneClientRepositoryStub,
  };
};

describe("DbLoadOneClient Usecase", () => {
  const id = 8;

  test("Should call LoadOneClientRepository with correct values", async () => {
    const { sut, loadOneClientRepositoryStub } = makeSut();
    const loadOneSpy = jest.spyOn(loadOneClientRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(loadOneSpy).toHaveBeenCalledWith(8);
  });

  test("Should load one client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.loadOne(id);
    expect(client).toEqual(makeClient());
  });

  test("Should throw if LoadOneClientRepository throws", async () => {
    const { sut, loadOneClientRepositoryStub } = makeSut();
    jest
      .spyOn(loadOneClientRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.loadOne(id);
    await expect(promise).rejects.toThrow();
  });
});
