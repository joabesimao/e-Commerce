import { DbLoadAllAddress } from "./db-load-all-address";
import { Address } from "../../../../domain/models/address/address";
import { LoadAllAddressRepository } from "../../../protocols/db/address/load-all-address";

interface SutTypes {
  sut: DbLoadAllAddress;
  loadAllAddressRepositoryStub: LoadAllAddressRepository;
}

const makeAddress = (): Address[] => [
  {
    id: 1,
    city: "any_city",
    neighborhood: "any_neighborhood",
    numberHouse: 1,
    reference: "any_ref",
    street: "any_street",
    cep: "any_cep",
  },
  {
    id: 2,
    city: "other_city",
    neighborhood: "other_neighborhood",
    numberHouse: 1,
    reference: "other_ref",
    street: "other_street",
    cep: "other_cep",
  },
];

const makeLoadAllAddressRepository = (): LoadAllAddressRepository => {
  class LoadAddressRepositoryStub implements LoadAllAddressRepository {
    async loadAll(): Promise<Address[]> {
      return new Promise((resolve) => resolve(makeAddress()));
    }
  }
  return new LoadAddressRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAllAddressRepositoryStub = makeLoadAllAddressRepository();
  const sut = new DbLoadAllAddress(loadAllAddressRepositoryStub);
  return {
    sut,
    loadAllAddressRepositoryStub,
  };
};

describe("DbLoadAllAddress Usecase", () => {
  test("Should call LoadAllAddressRepository with correct values", async () => {
    const { sut, loadAllAddressRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadAllAddressRepositoryStub, "loadAll");
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should load a address list on success", async () => {
    const { sut } = makeSut();
    const address = await sut.load();
    expect(address).toEqual(makeAddress());
  });

  test("Should throw if LoadAllAddressRepository throws", async () => {
    const { sut, loadAllAddressRepositoryStub } = makeSut();
    jest
      .spyOn(loadAllAddressRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
