import { DbAddProduct } from "./db-add-product";
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

interface SutTypes {
  sut: DbAddProduct;
  addProductRepositoryStub: AddProductRepository;
}

const makeAddProduct = (): ProductModel => ({
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 1,
});

const makeProduct = (): Product => ({
  id: 1,
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 1,
});

const makeProductRepository = (): AddProductRepository => {
  class ProductRepositoryStub implements AddProductRepository {
    async add(product: AddProductModel): Promise<Product> {
      return new Promise((resolve) => resolve(makeProduct()));
    }
  }
  return new ProductRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addProductRepositoryStub = makeProductRepository();
  const sut = new DbAddProduct(addProductRepositoryStub);
  return {
    sut,
    addProductRepositoryStub,
  };
};

describe("DbAddProduct Usecase", () => {
  test("Should call AddProductRepository with correct values", async () => {
    const { sut, addProductRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addProductRepositoryStub, "add");
    await sut.add(makeAddProduct());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      category: "any_category",
      description: "any_description",
      price: 1,
    });
  });

  test("Should add a product on success", async () => {
    const { sut } = makeSut();
    const product = await sut.add(makeAddProduct());
    expect(product).toEqual(makeProduct());
  });

  test("Should throw if AddProductRepository throws", async () => {
    const { sut, addProductRepositoryStub } = makeSut();
    jest
      .spyOn(addProductRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeAddProduct());
    await expect(promise).rejects.toThrow();
  });
});
