import { LoadOneProductController } from "./load-one-product-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Product,
  ProductModel,
} from "../../../../domain/models/product/product";
import { LoadProductById } from "../../../../domain/usescase/product/load-product/load-product";

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeProduct(),
  params: {
    id: 7,
  },
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
  sut: LoadOneProductController;
  loadOneProductStub: LoadProductById;
}
const makeLoadOneProductStub = (): LoadProductById => {
  class LoadOneProductStub implements LoadProductById {
    async loadOne(id: number): Promise<Product> {
      return new Promise((resolve) => resolve(makeFakeProduct()));
    }
  }
  return new LoadOneProductStub();
};

const makeSut = (): SutTypes => {
  const loadOneProductStub = makeLoadOneProductStub();
  const sut = new LoadOneProductController(loadOneProductStub);
  return {
    sut,
    loadOneProductStub,
  };
};

describe("LoadOneProduct Controller", () => {
  test("Should call LoadOneProduct with correct values", async () => {
    const { sut, loadOneProductStub } = makeSut();
    const loadOneProductSpy = jest.spyOn(loadOneProductStub, "loadOne");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadOneProductSpy).toHaveBeenCalledWith(7);
  });

  test("Should return 500 if LoadOneProduct throws", async () => {
    const { sut, loadOneProductStub } = makeSut();
    jest
      .spyOn(loadOneProductStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load one Product and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeProduct()));
  });
});
