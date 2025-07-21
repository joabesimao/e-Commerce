import { UpdateAddressController } from "./update-one-address-controller";
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
import { UpdateAddress } from "../../../../domain/usescase/address/update-address/update-address";

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
  sut: UpdateAddressController;
  updateAddressStub: UpdateAddress;
}
const makeUpdateAddressStub = (): UpdateAddress => {
  class UpdateAddressStub implements UpdateAddress {
    async update(id: number, info: Partial<Address>): Promise<Address> {
      return new Promise((resolve) => resolve(makeFakeAddressList()));
    }
  }
  return new UpdateAddressStub();
};

const makeSut = (): SutTypes => {
  const updateAddressStub = makeUpdateAddressStub();
  const sut = new UpdateAddressController(updateAddressStub);
  return {
    sut,
    updateAddressStub,
  };
};

describe("UpdateAddress Controller", () => {
  test("Should call updateAddress with correct values", async () => {
    const { sut, updateAddressStub } = makeSut();
    const updateAddressSpy = jest.spyOn(updateAddressStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(updateAddressSpy).toHaveBeenCalledWith(7, makeFakeAddressModel());
  });

  test("Should return 500 if UpdateAddress throws", async () => {
    const { sut, updateAddressStub } = makeSut();
    jest
      .spyOn(updateAddressStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should update one Address and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAddressList()));
  });
});
