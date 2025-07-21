import { DeleteContactController } from "./delete-contact-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";

import { DeleteContactById } from "../../../../domain/usescase/contact/delete-contact/delete-contact";

const makeFakeContactModel = (): ContactsModel => ({
  email: "any_email",
  phone: "123456",
  phoneSecundary: "123456",
});

const makeFakeContact = (): Contacts => ({
  id: 1,
  email: "any_email",
  phone: "123456",
  phoneSecundary: "123456",
});

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeContactModel(),
  params: {
    id: 1,
  },
});

interface SutTypes {
  sut: DeleteContactController;
  deleteContactStub: DeleteContactById;
}
const makeDeleteContactStub = (): DeleteContactById => {
  class DeleteContactStub implements DeleteContactById {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteContactStub();
};

const makeSut = (): SutTypes => {
  const deleteContactStub = makeDeleteContactStub();
  const sut = new DeleteContactController(deleteContactStub);
  return {
    sut,
    deleteContactStub,
  };
};

describe("DeleteContact Controller", () => {
  test("Should call DeleteContact with correct values", async () => {
    const { sut, deleteContactStub } = makeSut();
    const deleteOneContactSpy = jest.spyOn(deleteContactStub, "delete");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(deleteOneContactSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if DeleteContact throws", async () => {
    const { sut, deleteContactStub } = makeSut();
    jest
      .spyOn(deleteContactStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should delete one Contact and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
