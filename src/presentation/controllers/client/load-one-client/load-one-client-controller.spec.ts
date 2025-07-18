import { LoadOneClientController } from "./load-one-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Client, ClientModel } from "../../../../domain/models/client/client";
import {
  LoadAllClient,
  LoadClientById,
} from "../../../../domain/usescase/client/load-client/load-client";

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
  body: makeFakeClientModel(),
  params: {
    id: 1,
  },
});

interface SutTypes {
  sut: LoadOneClientController;
  loadOneClientStub: LoadClientById;
}
const makeLoadOneClientStub = (): LoadClientById => {
  class LoadOneClientStub implements LoadClientById {
    async loadOne(id: number): Promise<Client> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new LoadOneClientStub();
};

const makeSut = (): SutTypes => {
  const loadOneClientStub = makeLoadOneClientStub();
  const sut = new LoadOneClientController(loadOneClientStub);
  return {
    sut,
    loadOneClientStub,
  };
};

describe("LoadOneClient Controller", () => {
  test("Should call LoadOneClient with correct values", async () => {
    const { sut, loadOneClientStub } = makeSut();
    const loadOneClientSpy = jest.spyOn(loadOneClientStub, "loadOne");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadOneClientSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if LoadONeClient throws", async () => {
    const { sut, loadOneClientStub } = makeSut();
    jest
      .spyOn(loadOneClientStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load one Client and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
