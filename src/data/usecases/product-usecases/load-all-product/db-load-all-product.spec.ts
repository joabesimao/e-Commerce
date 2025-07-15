import { DbLoadAllProduct } from "./db-load-all-product";
import { AddContactRepository } from "../../../protocols/db/contact/add-contact";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { AddContactModel } from "../../../../domain/usescase/contact/add-contact/add-contact";
import { AddProductRepository } from "../../../protocols/db/product/add-product";
import {
  Product,
  ProductModel,
} from "../../../../domain/models/product/product";
import { AddProductModel } from "../../../../domain/usescase/product/add-product/add-product";
import { LoadAllProductRepository } from "../../../protocols/db/product/load-all-product";

interface SutTypes {
  sut: DbLoadAllProduct;
  loadAllProductRepositoryStub: LoadAllProductRepository;
}

const makeProduct = (): ProductModel => ({
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 1,
});

const makeProductList = (): Product[] => [
  {
    id: 1,
    name: "any_name",
    category: "any_category",
    description: "any_description",
    price: 1,
  },
  {
    id: 2,
    name: "other_name",
    category: "other_category",
    description: "other_description",
    price: 2,
  },
];

const makeProductRepository = (): LoadAllProductRepository => {
  class LoadAllProductRepositoryStub implements LoadAllProductRepository {
    async loadAll(): Promise<Product[]> {
      return new Promise((resolve) => resolve(makeProductList()));
    }
  }
  return new LoadAllProductRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAllProductRepositoryStub = makeProductRepository();
  const sut = new DbLoadAllProduct(loadAllProductRepositoryStub);
  return {
    sut,
    loadAllProductRepositoryStub,
  };
};

describe("DbLoadAllProduct Usecase", () => {
  test("Should call LoadAllProductRepository with correct values", async () => {
    const { sut, loadAllProductRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadAllProductRepositoryStub, "loadAll");
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should load all product on success", async () => {
    const { sut } = makeSut();
    const productList = await sut.load();
    expect(productList).toEqual(makeProductList());
  });

  test("Should throw if LoadAllProductRepository throws", async () => {
    const { sut, loadAllProductRepositoryStub } = makeSut();
    jest
      .spyOn(loadAllProductRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
