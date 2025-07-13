import { DbUpdateAddress } from "./db-update-one-address";
import { Address } from "../../../../domain/models/address/address";
import { UpdateAddressRepository } from "../../../protocols/db/address/update-address";

interface SutTypes {
  sut: DbUpdateAddress;
  updateAddressRepositoryStub: UpdateAddressRepository;
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

const makeUpdateAddressRepository = (): UpdateAddressRepository => {
  class UpdateAddressRepositoryStub implements UpdateAddressRepository {
    async update(id: number, info: Partial<Address>): Promise<Address> {
      return new Promise((resolve) => resolve(makeAddress()));
    }
  }
  return new UpdateAddressRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updateAddressRepositoryStub = makeUpdateAddressRepository();
  const sut = new DbUpdateAddress(updateAddressRepositoryStub);
  return {
    sut,
    updateAddressRepositoryStub,
  };
};

describe("DbUpdateAddress Usecase", () => {
  const id = 6;
  
  test("Should call UpdateAddressRepository with correct values", async () => {
    const { sut, updateAddressRepositoryStub } = makeSut();
    const udpateSpy = jest.spyOn(updateAddressRepositoryStub, "update");
    await sut.update(id, makeAddress());
    expect(udpateSpy).toHaveBeenCalledWith(6, makeAddress());
  });

  test("Should update one address on success", async () => {
    const { sut } = makeSut();
    const address = await sut.update(id, makeAddress());
    expect(address).toEqual(makeAddress());
  });

  test("Should throw if UpdateAddressRepository throws", async () => {
    const { sut, updateAddressRepositoryStub } = makeSut();
    jest
      .spyOn(updateAddressRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.update(id, makeAddress());
    await expect(promise).rejects.toThrow();
  });
});
