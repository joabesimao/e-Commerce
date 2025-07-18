import { UpdateProductController } from "./update-product-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Product,
  ProductModel,
} from "../../../../domain/models/product/product";
import { UpdateProduct } from "../../../../domain/usescase/product/update-product/update-product";

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

interface SutTypes {
  sut: UpdateProductController;
  updateProductStub: UpdateProduct;
}
const makeUpdateProductStub = (): UpdateProduct => {
  class UpdateProductStub implements UpdateProduct {
    async update(id: number, info: Partial<ProductModel>): Promise<Product> {
      return new Promise((resolve) => resolve(makeFakeProduct()));
    }
  }
  return new UpdateProductStub();
};

const makeSut = (): SutTypes => {
  const updateProductStub = makeUpdateProductStub();
  const sut = new UpdateProductController(updateProductStub);
  return {
    sut,
    updateProductStub,
  };
};

describe("UpdateProduct Controller", () => {
  test("Should call UpdateProduct with correct values", async () => {
    const { sut, updateProductStub } = makeSut();
    const updateProductSpy = jest.spyOn(updateProductStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(updateProductSpy).toHaveBeenCalledWith(7, makeFakeProduct());
  });

  test("Should return 500 if UpdateProduct throws", async () => {
    const { sut, updateProductStub } = makeSut();
    jest
      .spyOn(updateProductStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should update one Product and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeProduct()));
  });
});
