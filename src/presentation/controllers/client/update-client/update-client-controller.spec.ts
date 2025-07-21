import { UpdateClientController } from "./update-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Client, ClientModel } from "../../../../domain/models/client/client";
import {
  LoadAllClient,
  LoadClientById,
} from "../../../../domain/usescase/client/load-client/load-client";
import { UpdateClient } from "../../../../domain/usescase/client/update-client/update-client";

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
    phone: "858745558",
    phoneSecundary: "858745589",
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
    phone: "858745558",
    phoneSecundary: "858745589",
  },
});

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeClient(),
  params: {
    id: 1,
  },
});

interface SutTypes {
  sut: UpdateClientController;
  updateClientStub: UpdateClient;
}
const makeUpdateClientStub = (): UpdateClient => {
  class UpdateClientStub implements UpdateClient {
    async update(id: number, info: Partial<Client>): Promise<Client> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new UpdateClientStub();
};

const makeSut = (): SutTypes => {
  const updateClientStub = makeUpdateClientStub();
  const sut = new UpdateClientController(updateClientStub);
  return {
    sut,
    updateClientStub,
  };
};

describe("UpdateClient Controller", () => {
  test("Should call UpdateClient with correct values", async () => {
    const { sut, updateClientStub } = makeSut();
    const updateClientSpy = jest.spyOn(updateClientStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(updateClientSpy).toHaveBeenCalledWith(1, makeFakeClient());
  });

  test("Should return 500 if UpdateClient throws", async () => {
    const { sut, updateClientStub } = makeSut();
    jest
      .spyOn(updateClientStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should update one Client and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
