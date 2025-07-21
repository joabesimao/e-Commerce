import { AddClientController } from "./add-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../..//helpers/http/http-helper";
import { Client, ClientModel } from "../../../../domain/models/client/client";
import {
  AddClient,
  AddClientModel,
} from "../../../../domain/usescase/client/add-client/add-client";

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
  body: makeFakeClientModel(),
});

interface SutTypes {
  sut: AddClientController;
  addClientStub: AddClient;
}
const makeAddClientStub = (): AddClient => {
  class AddClientStub implements AddClient {
    async add(client: AddClientModel): Promise<Client> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new AddClientStub();
};

const makeSut = (): SutTypes => {
  const addClientStub = makeAddClientStub();
  const sut = new AddClientController(addClientStub);
  return {
    sut,
    addClientStub,
  };
};

describe("AddClient Controller", () => {
  test("Should call AddClient with correct values", async () => {
    const { sut, addClientStub } = makeSut();
    const addClientSpy = jest.spyOn(addClientStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addClientSpy).toHaveBeenCalledWith({
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
  });

  test("Should return 500 if AddClient throws", async () => {
    const { sut, addClientStub } = makeSut();
    jest
      .spyOn(addClientStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Client and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
