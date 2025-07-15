import { DbLoadOneProduct } from "./db-load-one-product";
import { Product } from "../../../../domain/models/product/product";
import { LoadOneProductRepository } from "../../../protocols/db/product/load-one-product";

interface SutTypes {
  sut: DbLoadOneProduct;
  loadOneProductRepositoryStub: LoadOneProductRepository;
}

const makeOneProduct = (): Product => ({
  id: 1,
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 1,
});

const makeOneProductRepository = (): LoadOneProductRepository => {
  class LoadOneProductRepositoryStub implements LoadOneProductRepository {
    async loadOne(id: number): Promise<Product> {
      return new Promise((resolve) => resolve(makeOneProduct()));
    }
  }
  return new LoadOneProductRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadOneProductRepositoryStub = makeOneProductRepository();
  const sut = new DbLoadOneProduct(loadOneProductRepositoryStub);
  return {
    sut,
    loadOneProductRepositoryStub,
  };
};

describe("DbLoadOneProduct Usecase", () => {
  const id = 7;

  test("Should call LoadOneProductRepository with correct values", async () => {
    const { sut, loadOneProductRepositoryStub } = makeSut();
    const loadOneSpy = jest.spyOn(loadOneProductRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(loadOneSpy).toHaveBeenCalledWith(7);
  });

  test("Should load one product on success", async () => {
    const { sut } = makeSut();
    const product = await sut.loadOne(id);
    expect(product).toEqual(makeOneProduct());
  });

  test("Should throw if LoadOneProductRepository throws", async () => {
    const { sut, loadOneProductRepositoryStub } = makeSut();
    jest
      .spyOn(loadOneProductRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadOne(id);
    await expect(promise).rejects.toThrow();
  });
});
