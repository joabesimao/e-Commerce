import { AddProductController } from "./add-product-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";

import {
  Product,
  ProductModel,
} from "../../../../domain/models/product/product";
import {
  AddProduct,
  AddProductModel,
} from "../../../../domain/usescase/product/add-product/add-product";

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeProductModel(),
});

const makeFakeProduct = (): Product => ({
  id: 1,
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 10,
});

const makeFakeProductModel = (): ProductModel => ({
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 10,
});

interface SutTypes {
  sut: AddProductController;
  addProductStub: AddProduct;
}
const makeAddProductStub = (): AddProduct => {
  class AddProductStub implements AddProduct {
    async add(client: AddProductModel): Promise<Product> {
      return new Promise((resolve) => resolve(makeFakeProduct()));
    }
  }
  return new AddProductStub();
};

const makeSut = (): SutTypes => {
  const addProductStub = makeAddProductStub();
  const sut = new AddProductController(addProductStub);
  return {
    sut,
    addProductStub,
  };
};

describe("AddProduct Controller", () => {
  test("Should call AddProduct with correct values", async () => {
    const { sut, addProductStub } = makeSut();
    const addProductSpy = jest.spyOn(addProductStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addProductSpy).toHaveBeenCalledWith(makeFakeProductModel());
  });

  test("Should return 500 if AddProduct throws", async () => {
    const { sut, addProductStub } = makeSut();
    jest
      .spyOn(addProductStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Product and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeProduct()));
  });
});
