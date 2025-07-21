import { AddAddressController } from "./add-address-controller";
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

const makeFakeAddressModel = (): AddAddressModel => ({
  cep: "any_cep",
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 123,
  reference: "any_ref",
  street: "any_street",
});

const makeFakeAddress = (): Address => ({
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
});

interface SutTypes {
  sut: AddAddressController;
  addAddressStub: AddAddress;
}
const makeAddAddressStub = (): AddAddress => {
  class AddAddressStub implements AddAddress {
    async add(address: AddAddressModel): Promise<Address> {
      return new Promise((resolve) => resolve(makeFakeAddress()));
    }
  }
  return new AddAddressStub();
};

const makeSut = (): SutTypes => {
  const addAddressStub = makeAddAddressStub();
  const sut = new AddAddressController(addAddressStub);
  return {
    sut,
    addAddressStub,
  };
};

describe("AddAddress Controller", () => {
  test("Should call AddAddress with correct values", async () => {
    const { sut, addAddressStub } = makeSut();
    const addAddressSpy = jest.spyOn(addAddressStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addAddressSpy).toHaveBeenCalledWith({
      cep: "any_cep",
      city: "any_city",
      neighborhood: "any_neighborhood",
      numberHouse: 123,
      reference: "any_ref",
      street: "any_street",
    });
  });

  test("Should return 500 if AddAddress throws", async () => {
    const { sut, addAddressStub } = makeSut();
    jest
      .spyOn(addAddressStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Address and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAddress()));
  });
});
