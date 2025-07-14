import { DbLoadOneAddress } from "./db-load-one-address";
import { Address } from "../../../../domain/models/address/address";
import { LoadAddressById } from "../../../../domain/usescase/address/load-address/load-address";
import { LoadOneAddressRepository } from "../../../protocols/db/address/load-one-address";

interface SutTypes {
  sut: DbLoadOneAddress;
  loadOneAddressRepositoryStub: LoadAddressById;
}

const makeAddress = (): Address => ({
  id: 1,
  city: "any_city",
  neighborhood: "any_neighborhood",
  numberHouse: 1,
  reference: "any_ref",
  street: "any_street",
  cep: "any_cep",
});

const makeLoadOneAddressRepository = (): LoadOneAddressRepository => {
  class LoadOneAddressRepositoryStub implements LoadOneAddressRepository {
    async loadOne(): Promise<Address> {
      return new Promise((resolve) => resolve(makeAddress()));
    }
  }
  return new LoadOneAddressRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadOneAddressRepositoryStub = makeLoadOneAddressRepository();
  const sut = new DbLoadOneAddress(loadOneAddressRepositoryStub);
  return {
    sut,
    loadOneAddressRepositoryStub,
  };
};

describe("DbLoadOneAddress Usecase", () => {
  const id = 6;
  test("Should call LoadOneAddressRepository with correct values", async () => {
    const { sut, loadOneAddressRepositoryStub } = makeSut();
    const loadOneSpy = jest.spyOn(loadOneAddressRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(loadOneSpy).toHaveBeenCalledWith(6);
  });

  test("Should load one address on success", async () => {
    const { sut } = makeSut();
    const address = await sut.loadOne(id);
    expect(address).toEqual(makeAddress());
  });

  test("Should throw if LoadOneAddressRepository throws", async () => {
    const { sut, loadOneAddressRepositoryStub } = makeSut();
    jest
      .spyOn(loadOneAddressRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.loadOne(id);
    await expect(promise).rejects.toThrow();
  });
});
