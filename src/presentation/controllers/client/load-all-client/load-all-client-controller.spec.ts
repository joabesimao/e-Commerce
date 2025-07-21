import { LoadAllClientController } from "./load-all-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Client, ClientModel } from "../../../../domain/models/client/client";
import {
  AddClient,
  AddClientModel,
} from "../../../../domain/usescase/client/add-client/add-client";
import { LoadAllClient } from "../../../../domain/usescase/client/load-client/load-client";

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

const makeFakeClientList = (): Client[] => [
  {
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
  },
];

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeClientModel(),
});

interface SutTypes {
  sut: LoadAllClientController;
  loadAllClientStub: LoadAllClient;
}
const makeLoadAllClientStub = (): LoadAllClient => {
  class LoadAllClientStub implements LoadAllClient {
    async load(): Promise<Client[]> {
      return new Promise((resolve) => resolve(makeFakeClientList()));
    }
  }
  return new LoadAllClientStub();
};

const makeSut = (): SutTypes => {
  const loadAllClientStub = makeLoadAllClientStub();
  const sut = new LoadAllClientController(loadAllClientStub);
  return {
    sut,
    loadAllClientStub,
  };
};

describe("LoadAllClient Controller", () => {
  test("Should call LoadAllClient with correct values", async () => {
    const { sut, loadAllClientStub } = makeSut();
    const addClientSpy = jest.spyOn(loadAllClientStub, "load");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addClientSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadAllClient throws", async () => {
    const { sut, loadAllClientStub } = makeSut();
    jest
      .spyOn(loadAllClientStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load a Client list and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClientList()));
  });
});
