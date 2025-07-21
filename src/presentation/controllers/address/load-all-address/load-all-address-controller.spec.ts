import { LoadAllAddressController } from "./load-all-address-controller";
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
import { LoadAllAddress } from "../../../../domain/usescase/address/load-address/load-address";

const makeFakeAddressModel = (): AddAddressModel => ({
  cep: "any_cep",
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 123,
  reference: "any_ref",
  street: "any_street",
});

const makeFakeAddressList = (): Address[] => [
  {
    id: 1,
    cep: "any_cep",
    city: "any_city",
    neighborhood: "any_neighborhood",
    numberHouse: 123,
    reference: "any_ref",
    street: "any_street",
  },
  {
    id: 2,
    cep: "other_cep",
    city: "other_city",
    neighborhood: "other_neighborhood",
    numberHouse: 123,
    reference: "other_ref",
    street: "other_street",
  },
];

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeAddressModel(),
});

interface SutTypes {
  sut: LoadAllAddressController;
  loadAllAddressStub: LoadAllAddress;
}
const makeLoadAllAddressStub = (): LoadAllAddress => {
  class LoadAllAddressStub implements LoadAllAddress {
    async load(): Promise<Address[]> {
      return new Promise((resolve) => resolve(makeFakeAddressList()));
    }
  }
  return new LoadAllAddressStub();
};

const makeSut = (): SutTypes => {
  const loadAllAddressStub = makeLoadAllAddressStub();
  const sut = new LoadAllAddressController(loadAllAddressStub);
  return {
    sut,
    loadAllAddressStub,
  };
};

describe("LoadAllAddress Controller", () => {
  test("Should call loadAllAddress with correct values", async () => {
    const { sut, loadAllAddressStub } = makeSut();
    const loadAllAddressSpy = jest.spyOn(loadAllAddressStub, "load");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllAddressSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadAllAddress throws", async () => {
    const { sut, loadAllAddressStub } = makeSut();
    jest
      .spyOn(loadAllAddressStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load a list of Address and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAddressList()));
  });
});
