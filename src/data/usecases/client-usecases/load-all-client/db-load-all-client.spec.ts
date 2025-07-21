import { DbLoadAllClient } from "./db-load-all-client";
import { Client } from "../../../../domain/models/client/client";
import { LoadAllClientRepository } from "../../../protocols/db/client/load-all-client";

interface SutTypes {
  sut: DbLoadAllClient;
  loadAllClientRepositoryStub: LoadAllClientRepository;
}

const makeClient = (): Client[] => [
  {
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
  },
  {
    id: 2,
    name: "other_name",
    cpf: "other_cpf",
    address: {
      cep: "other_cep",
      city: "other_city",
      neighborhood: "other_neighborhood",
      numberHouse: 1,
      reference: "other_ref",
      street: "other_street",
    },
    contact: {
      email: "other_email",
      phone: "55555555",
      phoneSecundary: "6666666",
    },
  },
];

const makeLoadAllClientRepository = (): LoadAllClientRepository => {
  class LoadAllClientRepositoryStub implements LoadAllClientRepository {
    async loadAll(): Promise<Client[]> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new LoadAllClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAllClientRepositoryStub = makeLoadAllClientRepository();
  const sut = new DbLoadAllClient(loadAllClientRepositoryStub);
  return {
    sut,
    loadAllClientRepositoryStub,
  };
};

describe("DbLoadAllClient Usecase", () => {
  test("Should call LoadAllClientRepository with correct values", async () => {
    const { sut, loadAllClientRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadAllClientRepositoryStub, "loadAll");
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should load all client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.load();
    expect(client).toEqual(makeClient());
  });

  test("Should throw if LoadAllClientRepository throws", async () => {
    const { sut, loadAllClientRepositoryStub } = makeSut();
    jest
      .spyOn(loadAllClientRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
