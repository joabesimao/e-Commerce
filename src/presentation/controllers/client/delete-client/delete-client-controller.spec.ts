import { DeleteClientController } from "./delete-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Client, ClientModel } from "../../../../domain/models/client/client";
import { UpdateClient } from "../../../../domain/usescase/client/update-client/update-client";
import { DeleteClientById } from "../../../../domain/usescase/client/delete-client/delete-client";

const makeFakeClientModel = (): ClientModel => ({
  cpf: "04681879-99",
  name: "any_name",
  address: {
    cep: "any_cep",
    city: "any_city",
    neighborhood: "any_neighborhood",
    numberHouse: 123,
    reference: "any_ref",
    street: "any_street",
  },
  contact: {
    email: "any_email@email.com",
    phone: 858745558,
    phoneSecundary: 858745589,
  },
});

const makeFakeClient = (): Client => ({
  id: 1,
  cpf: "04681879-99",
  name: "any_name",
  address: {
    cep: "any_cep",
    city: "any_city",
    neighborhood: "any_neighborhood",
    numberHouse: 123,
    reference: "any_ref",
    street: "any_street",
  },
  contact: {
    email: "any_email@email.com",
    phone: 858745558,
    phoneSecundary: 858745589,
  },
});

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeClient(),
  params: {
    id: 1,
  },
});

interface SutTypes {
  sut: DeleteClientController;
  deleteClientStub: DeleteClientById;
}
const makeDeleteClientStub = (): DeleteClientById => {
  class DeleteClientStub implements DeleteClientById {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteClientStub();
};

const makeSut = (): SutTypes => {
  const deleteClientStub = makeDeleteClientStub();
  const sut = new DeleteClientController(deleteClientStub);
  return {
    sut,
    deleteClientStub,
  };
};

describe("DeleteClient Controller", () => {
  test("Should call DeleteClient with correct values", async () => {
    const { sut, deleteClientStub } = makeSut();
    const deleteClientSpy = jest.spyOn(deleteClientStub, "delete");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(deleteClientSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if DeleteClient throws", async () => {
    const { sut, deleteClientStub } = makeSut();
    jest
      .spyOn(deleteClientStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should delete one Client and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
