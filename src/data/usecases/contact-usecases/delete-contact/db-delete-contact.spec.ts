import { DbDeleteContact } from "./db-delete-contact";
import { DeleteContactRepository } from "../../../protocols/db/contact/delete-contact";

interface SutTypes {
  sut: DbDeleteContact;
  deleteContactRepositoryStub: DeleteContactRepository;
}

const makeDeleteContactsRepository = (): DeleteContactRepository => {
  class DeleteContactRepositoryStub implements DeleteContactRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteContactRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteContactRepositoryStub = makeDeleteContactsRepository();
  const sut = new DbDeleteContact(deleteContactRepositoryStub);
  return {
    sut,
    deleteContactRepositoryStub,
  };
};

describe("DbDeleteContact Usecase", () => {
  const id = 7;

  test("Should call DeleteContactRepository with correct values", async () => {
    const { sut, deleteContactRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteContactRepositoryStub, "delete");
    await sut.delete(id);
    expect(deleteSpy).toHaveBeenCalledWith(7);
  });

  test("Should delete contact on success", async () => {
    const { sut } = makeSut();
    const contact = await sut.delete(id);
    expect(contact).toEqual("Deletado com Sucesso!");
  });

  test("Should throw if DeleteContactRepository throws", async () => {
    const { sut, deleteContactRepositoryStub } = makeSut();
    jest
      .spyOn(deleteContactRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.delete(id);
    await expect(promise).rejects.toThrow();
  });
});
