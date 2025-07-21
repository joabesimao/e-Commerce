import { LoadAllProductController } from "./load-all-product-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Product,
  ProductModel,
} from "../../../../domain/models/product/product";
import { LoadAllProduct } from "../../../../domain/usescase/product/load-product/load-product";

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeProductModel(),
});

const makeFakeProduct = (): Product[] => [
  {
    id: 1,
    name: "any_name",
    category: "any_category",
    description: "any_description",
    price: 10,
  },
  {
    id: 2,
    name: "other_name",
    category: "other_category",
    description: "other_description",
    price: 20,
  },
];

const makeFakeProductModel = (): ProductModel => ({
  name: "any_name",
  category: "any_category",
  description: "any_description",
  price: 10,
});

interface SutTypes {
  sut: LoadAllProductController;
  loadAllProductStub: LoadAllProduct;
}
const makeLoadAllProductStub = (): LoadAllProduct => {
  class LoadAllProductStub implements LoadAllProduct {
    async load(): Promise<Product[]> {
      return new Promise((resolve) => resolve(makeFakeProduct()));
    }
  }
  return new LoadAllProductStub();
};

const makeSut = (): SutTypes => {
  const loadAllProductStub = makeLoadAllProductStub();
  const sut = new LoadAllProductController(loadAllProductStub);
  return {
    sut,
    loadAllProductStub,
  };
};

describe("LoadAllProduct Controller", () => {
  test("Should call LoadAllProduct with correct values", async () => {
    const { sut, loadAllProductStub } = makeSut();
    const loadAllProductSpy = jest.spyOn(loadAllProductStub, "load");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllProductSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadAllProduct throws", async () => {
    const { sut, loadAllProductStub } = makeSut();
    jest
      .spyOn(loadAllProductStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load all Product and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeProduct()));
  });
});
