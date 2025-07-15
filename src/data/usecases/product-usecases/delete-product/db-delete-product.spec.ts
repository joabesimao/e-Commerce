import { DbDeleteProduct } from "./db-delete-product";
import { Product } from "../../../../domain/models/product/product";
import { LoadOneProductRepository } from "../../../protocols/db/product/load-one-product";
import { UpdateProductRepository } from "../../../protocols/db/product/update-product";
import { DeleteProductRepository } from "../../../protocols/db/product/delete-product";

interface SutTypes {
  sut: DbDeleteProduct;
  deleteProductRepositoryStub: DeleteProductRepository;
}

const makeDeleteProductRepository = (): DeleteProductRepository => {
  class DeleteProductRepositoryStub implements DeleteProductRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve(""));
    }
  }
  return new DeleteProductRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deleteProductRepositoryStub = makeDeleteProductRepository();
  const sut = new DbDeleteProduct(deleteProductRepositoryStub);
  return {
    sut,
    deleteProductRepositoryStub,
  };
};

describe("DbDeleteProduct Usecase", () => {
  const id = 7;

  test("Should call DeleteProductRepository with correct values", async () => {
    const { sut, deleteProductRepositoryStub } = makeSut();
    const deleteOneSpy = jest.spyOn(deleteProductRepositoryStub, "delete");
    await sut.delete(id);
    expect(deleteOneSpy).toHaveBeenCalledWith(7);
  });

  test("Should delete one product on success", async () => {
    const { sut } = makeSut();
    const product = await sut.delete(id);
    expect(product).toEqual("");
  });

  test("Should throw if DeleteProductRepository throws", async () => {
    const { sut, deleteProductRepositoryStub } = makeSut();
    jest
      .spyOn(deleteProductRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.delete(id);
    await expect(promise).rejects.toThrow();
  });
});
