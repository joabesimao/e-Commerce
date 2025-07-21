import { DeleteAddressController } from "./delete-one-address-controller";
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
import { DeleteAddressById } from "../../../../domain/usescase/address/delete-address/delete-address";

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
  sut: DeleteAddressController;
  deleteAddressStub: DeleteAddressById;
}
const makeDeleteAddressStub = (): DeleteAddressById => {
  class DeleteAddressStub implements DeleteAddressById {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) =>
        resolve(`Address ${id} Deletado com Sucesso!`)
      );
    }
  }
  return new DeleteAddressStub();
};

const makeSut = (): SutTypes => {
  const deleteAddressStub = makeDeleteAddressStub();
  const sut = new DeleteAddressController(deleteAddressStub);
  return {
    sut,
    deleteAddressStub,
  };
};

describe("DeleteAddress Controller", () => {
  test("Should call deleteAddress with correct values", async () => {
    const { sut, deleteAddressStub } = makeSut();
    const deleteAddressSpy = jest.spyOn(deleteAddressStub, "delete");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(deleteAddressSpy).toHaveBeenCalledWith(7);
  });

  test("Should return 500 if DeleteAddress throws", async () => {
    const { sut, deleteAddressStub } = makeSut();
    jest
      .spyOn(deleteAddressStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should delete one Address and return 200 on sucess", async () => {
    const id = makeFakeRequest().params.id;
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(`Address ${id} Deletado com Sucesso!`));
  });
});
