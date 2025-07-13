import { DbDeleteAddress } from "./db-delete-address";
import { DeleteAddressRepository } from "../../../protocols/db/address/delete-address";

interface SutTypes {
  sut: DbDeleteAddress;
  deleteAddressRepositoryStub: DeleteAddressRepository;
}

const makeAddressRepository = (): DeleteAddressRepository => {
  class DeleteAddressRepositoryStub implements DeleteAddressRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteAddressRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteAddressRepositoryStub = makeAddressRepository();
  const sut = new DbDeleteAddress(deleteAddressRepositoryStub);
  return {
    sut,
    deleteAddressRepositoryStub,
  };
};

describe("DbDeleteAddress Usecase", () => {
  const id = 7;

  test("Should call DeleteAddressRepository with correct values", async () => {
    const { sut, deleteAddressRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteAddressRepositoryStub, "delete");
    await sut.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(7);
  });

  test("Should delete one address on success", async () => {
    const { sut } = makeSut();
    const address = await sut.delete(id);
    expect(address).toEqual("Deletado com Sucesso!");
  });

  test("Should throw if DeleteAddressRepository throws", async () => {
    const { sut, deleteAddressRepositoryStub } = makeSut();
    jest
      .spyOn(deleteAddressRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.delete(id);
    await expect(promise).rejects.toThrow();
  });
});
