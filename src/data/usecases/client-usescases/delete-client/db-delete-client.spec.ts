import { DbDeleteClient } from "./db-delete-client";
import { AddClientRepository } from "../../../protocols/db/client/add-client";
import { Client } from "../../../../domain/models/client/client";
import { AddClientModel } from "../../../../domain/usescase/client/add-client/add-client";
import { DeleteClientRepository } from "../../../protocols/db/client/delete-client";

interface SutTypes {
  sut: DbDeleteClient;
  deleteClientRepositoryStub: DeleteClientRepository;
}

const makeDeleteClientRepository = (): DeleteClientRepository => {
  class DeleteClientRepositoryStub implements DeleteClientRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteClientRepositoryStub = makeDeleteClientRepository();
  const sut = new DbDeleteClient(deleteClientRepositoryStub);
  return {
    sut,
    deleteClientRepositoryStub,
  };
};

describe("DbDeleteClient Usecase", () => {
  const id = 7;

  test("Should call DeleteClientRepository with correct values", async () => {
    const { sut, deleteClientRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteClientRepositoryStub, "delete");
    await sut.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(7);
  });

  test("Should delete a client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.delete(id);
    expect(client).toEqual("Deletado com Sucesso!");
  });

  test("Should throw if DeleteClientRepository throws", async () => {
    const { sut, deleteClientRepositoryStub } = makeSut();
    jest
      .spyOn(deleteClientRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.delete(id);
    await expect(promise).rejects.toThrow();
  });
});
