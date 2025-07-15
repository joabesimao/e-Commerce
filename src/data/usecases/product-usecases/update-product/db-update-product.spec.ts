import { DbUpdateProduct } from "./db-update-product";
import { Product } from "../../../../domain/models/product/product";
import { LoadOneProductRepository } from "../../../protocols/db/product/load-one-product";
import { UpdateProductRepository } from "../../../protocols/db/product/update-product";

interface SutTypes {
  sut: DbUpdateProduct;
  updateProductRepositoryStub: UpdateProductRepository;
}

const makeOneProduct = (): Product => ({
  id: 1,
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 1,
});

const makeUpdateProductRepository = (): UpdateProductRepository => {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    async update(id: number, info: Partial<Product>): Promise<Product> {
      return new Promise((resolve) => resolve(makeOneProduct()));
    }
  }
  return new UpdateProductRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateProductRepositoryStub = makeUpdateProductRepository();
  const sut = new DbUpdateProduct(updateProductRepositoryStub);
  return {
    sut,
    updateProductRepositoryStub,
  };
};

describe("DbUpdateProduct Usecase", () => {
  const id = 7;

  test("Should call UpdateProductRepository with correct values", async () => {
    const { sut, updateProductRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateProductRepositoryStub, "update");
    await sut.update(id, makeOneProduct());
    expect(updateSpy).toHaveBeenCalledWith(7, {
      id: 1,
      name: "any_name",
      category: "any_category",
      description: "any_description",
      price: 1,
    });
  });

  test("Should update one product on success", async () => {
    const { sut } = makeSut();
    const product = await sut.update(id, makeOneProduct());
    expect(product).toEqual(makeOneProduct());
  });

  test("Should throw if UpdateProductRepository throws", async () => {
    const { sut, updateProductRepositoryStub } = makeSut();
    jest
      .spyOn(updateProductRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.update(id, makeOneProduct());
    await expect(promise).rejects.toThrow();
  });
});
