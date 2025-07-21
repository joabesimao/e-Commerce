import { DbUpdateClient } from "./db-update-client";
import { Client } from "../../../../domain/models/client/client";
import { UpdateClientRepository } from "../../../protocols/db/client/update-client";

interface SutTypes {
  sut: DbUpdateClient;
  updateClientRepositoryStub: UpdateClientRepository;
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

const makeUpdateClientRepository = (): UpdateClientRepository => {
  class UpdateClientRepositoryStub implements UpdateClientRepository {
    async update(id: number, info: Partial<Client>): Promise<Client> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new UpdateClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateClientRepositoryStub = makeUpdateClientRepository();
  const sut = new DbUpdateClient(updateClientRepositoryStub);
  return {
    sut,
    updateClientRepositoryStub,
  };
};

describe("DbUpdateClient Usecase", () => {
  const id = 8;

  test("Should call UpdateClientRepository with correct values", async () => {
    const { sut, updateClientRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateClientRepositoryStub, "update");
    await sut.update(id, makeClient());
    expect(updateSpy).toHaveBeenCalledWith(8, makeClient());
  });

  test("Should update one client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.update(id, makeClient());
    expect(client).toEqual(makeClient());
  });

  test("Should throw if UpdateClientRepository throws", async () => {
    const { sut, updateClientRepositoryStub } = makeSut();
    jest
      .spyOn(updateClientRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.update(id, makeClient());
    await expect(promise).rejects.toThrow();
  });
});
