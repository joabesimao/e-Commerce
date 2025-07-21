import { AddContactController } from "./add-contact-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import {
  AddContact,
  AddContactModel,
} from "../../../../domain/usescase/contact/add-contact/add-contact";

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
});

interface SutTypes {
  sut: AddContactController;
  addContactStub: AddContact;
}
const makeAddContactStub = (): AddContact => {
  class AddContactStub implements AddContact {
    async add(contact: AddContactModel): Promise<Contacts> {
      return new Promise((resolve) => resolve(makeFakeContact()));
    }
  }
  return new AddContactStub();
};

const makeSut = (): SutTypes => {
  const addContactStub = makeAddContactStub();
  const sut = new AddContactController(addContactStub);
  return {
    sut,
    addContactStub,
  };
};

describe("AddContact Controller", () => {
  test("Should call AddContact with correct values", async () => {
    const { sut, addContactStub } = makeSut();
    const addContactSpy = jest.spyOn(addContactStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addContactSpy).toHaveBeenCalledWith({
      email: "any_email",
      phone: "123456",
      phoneSecundary: "123456",
    });
  });

  test("Should return 500 if AddContact throws", async () => {
    const { sut, addContactStub } = makeSut();
    jest
      .spyOn(addContactStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Contact and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeContact()));
  });
});
