import { DbAddAddress } from "./db-add-address";
import { AddClientRepository } from "../../../protocols/db/client/add-client";
import { Client } from "../../../../domain/models/client/client";
import { AddClientModel } from "../../../../domain/usescase/client/add-client/add-client";
import { AddAddressRepository } from "../../../protocols/db/address/add-address";
import {
  AddAddress,
  AddAddressModel,
} from "../../../../domain/usescase/address/add-address/add-address";
import { Address } from "../../../../domain/models/address/address";

interface SutTypes {
  sut: DbAddAddress;
  addAddressRepositoryStub: AddAddressRepository;
}

const makeAddAddress = (): AddAddressModel => ({
  cep: "any_cep",
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 1,
  reference: "any_ref",
  street: "any_street",
});

const makeAddress = (): Address => ({
  id: 1,
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 1,
  reference: "any_ref",
  street: "any_street",
  cep: "any_cep",
});

const makeAddressRepository = (): AddAddressRepository => {
  class AddressRepositoryStub implements AddAddressRepository {
    async add(address: AddAddressModel): Promise<Address> {
      return new Promise((resolve) => resolve(makeAddress()));
    }
  }
  return new AddressRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addAddressRepositoryStub = makeAddressRepository();
  const sut = new DbAddAddress(addAddressRepositoryStub);
  return {
    sut,
    addAddressRepositoryStub,
  };
};

describe("DbAddAddress Usecase", () => {
  test("Should call AddAddressRepository with correct values", async () => {
    const { sut, addAddressRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAddressRepositoryStub, "add");
    await sut.add(makeAddAddress());
    expect(addSpy).toHaveBeenCalledWith(makeAddAddress());
  });

  test("Should add a address on success", async () => {
    const { sut } = makeSut();
    const address = await sut.add(makeAddAddress());
    expect(address).toEqual(makeAddress());
  });

  test("Should throw if AddAddressRepository throws", async () => {
    const { sut, addAddressRepositoryStub } = makeSut();
    jest
      .spyOn(addAddressRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeAddress());
    await expect(promise).rejects.toThrow();
  });
});
