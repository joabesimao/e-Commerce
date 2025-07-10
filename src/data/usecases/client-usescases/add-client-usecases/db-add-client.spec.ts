import { DbAddClient } from "./db-add-client";
import { AddClientRepository } from "../../../protocols/db/client/add-client";
import { Client } from "../../../../domain/models/client/client";
import { AddClientModel } from "../../../../domain/usescase/client/add-client/add-client";

interface SutTypes {
  sut: DbAddClient;
  clientRepositoryStub: AddClientRepository;
}

const makeAddClient = (): AddClientModel => ({
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
    phone: 55555555,
    phoneSecundary: 6666666,
  },
});

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
    phone: 55555555,
    phoneSecundary: 6666666,
  },
});

const makeClientRepository = (): AddClientRepository => {
  class ClientRepositoryStub implements AddClientRepository {
    async add(client: AddClientModel): Promise<Client> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new ClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const clientRepositoryStub = makeClientRepository();

  const sut = new DbAddClient(clientRepositoryStub);
  return {
    sut,
    clientRepositoryStub,
  };
};

describe("DbAddClient Usecase", () => {
  test("Should call AddClientRepository with correct values", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(clientRepositoryStub, "add");
    await sut.add(makeAddClient());
    expect(addSpy).toHaveBeenCalledWith({
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
        phone: 55555555,
        phoneSecundary: 6666666,
      },
    });
  });

  test("Should add a client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.add(makeAddClient());
    expect(client).toEqual(makeClient());
  });

  test("Should throw if addClientRepository throws", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    jest
      .spyOn(clientRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeClient());
    await expect(promise).rejects.toThrow();
  });
});
