import { LoadOneAddressController } from "./load-one-address-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Client, ClientModel } from "../../../../domain/models/client/client";
import {
  AddClient,
  AddClientModel,
} from "../../../../domain/usescase/client/add-client/add-client";
import {
  AddAddress,
  AddAddressModel,
} from "../../../../domain/usescase/address/add-address/add-address";
import { Address } from "../../../../domain/models/address/address";
import {
  LoadAddressById,
  LoadAllAddress,
} from "../../../../domain/usescase/address/load-address/load-address";

const makeFakeAddressModel = (): AddAddressModel => ({
  cep: "any_cep",
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 123,
  reference: "any_ref",
  street: "any_street",
});

const makeFakeAddressList = (): Address => ({
  id: 1,
  cep: "any_cep",
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 123,
  reference: "any_ref",
  street: "any_street",
});

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeAddressModel(),
  params: {
    id: 7,
  },
});

interface SutTypes {
  sut: LoadOneAddressController;
  loadOneAddressStub: LoadAddressById;
}
const makeLoadOneAddressStub = (): LoadAddressById => {
  class LoadOneAddressStub implements LoadAddressById {
    async loadOne(id: number): Promise<Address> {
      return new Promise((resolve) => resolve(makeFakeAddressList()));
    }
  }
  return new LoadOneAddressStub();
};

const makeSut = (): SutTypes => {
  const loadOneAddressStub = makeLoadOneAddressStub();
  const sut = new LoadOneAddressController(loadOneAddressStub);
  return {
    sut,
    loadOneAddressStub,
  };
};

describe("LoadOneAddress Controller", () => {
  test("Should call loadOneAddress with correct values", async () => {
    const { sut, loadOneAddressStub } = makeSut();
    const loadOneAddressSpy = jest.spyOn(loadOneAddressStub, "loadOne");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadOneAddressSpy).toHaveBeenCalledWith(7);
  });

  test("Should return 500 if LoadOneAddress throws", async () => {
    const { sut, loadOneAddressStub } = makeSut();
    jest
      .spyOn(loadOneAddressStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load one Address and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAddressList()));
  });
});
