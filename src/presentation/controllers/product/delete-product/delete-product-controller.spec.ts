import { DeleteteProductController } from "./delete-product-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Product } from "../../../../domain/models/product/product";
import { DeleteProductById } from "../../../../domain/usescase/product/delete-product/delete-product";

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
  sut: DeleteteProductController;
  deleteProductStub: DeleteProductById;
}
const makeDeleteProductStub = (): DeleteProductById => {
  class DeleteProductStub implements DeleteProductById {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteProductStub();
};

const makeSut = (): SutTypes => {
  const deleteProductStub = makeDeleteProductStub();
  const sut = new DeleteteProductController(deleteProductStub);
  return {
    sut,
    deleteProductStub,
  };
};

describe("DeleteProduct Controller", () => {
  test("Should call DeleteProduct with correct values", async () => {
    const { sut, deleteProductStub } = makeSut();
    const deleteProductSpy = jest.spyOn(deleteProductStub, "delete");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(deleteProductSpy).toHaveBeenCalledWith(7);
  });

  test("Should return 500 if DeleteProduct throws", async () => {
    const { sut, deleteProductStub } = makeSut();
    jest
      .spyOn(deleteProductStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should delete one Product and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
