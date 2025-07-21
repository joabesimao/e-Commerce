import { UpdateContactController } from "./update-contact-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { UpdateContact } from "../../../../domain/usescase/contact/update-contact/update-contact";

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
  sut: UpdateContactController;
  updateContactStub: UpdateContact;
}
const makeUpdateContactStub = (): UpdateContact => {
  class UpdateContactStub implements UpdateContact {
    async update(id: number, info: Partial<ContactsModel>): Promise<Contacts> {
      return new Promise((resolve) => resolve(makeFakeContact()));
    }
  }
  return new UpdateContactStub();
};

const makeSut = (): SutTypes => {
  const updateContactStub = makeUpdateContactStub();
  const sut = new UpdateContactController(updateContactStub);
  return {
    sut,
    updateContactStub,
  };
};

describe("UpdateContact Controller", () => {
  test("Should call UpdateContact with correct values", async () => {
    const { sut, updateContactStub } = makeSut();
    const updateOneContactSpy = jest.spyOn(updateContactStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(updateOneContactSpy).toHaveBeenCalledWith(1, makeFakeContactModel());
  });

  test("Should return 500 if UpdateContact throws", async () => {
    const { sut, updateContactStub } = makeSut();
    jest
      .spyOn(updateContactStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should update one Contact and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeContact()));
  });
});
