import { LoadOneContactController } from "./load-one-contact-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { LoadContactById } from "../../../../domain/usescase/contact/load-contact/load-contact";

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
  sut: LoadOneContactController;
  loadOneContactStub: LoadContactById;
}
const makeLoadAllContactStub = (): LoadContactById => {
  class LoadOneContactStub implements LoadContactById {
    async loadOne(id: number): Promise<Contacts> {
      return new Promise((resolve) => resolve(makeFakeContact()));
    }
  }
  return new LoadOneContactStub();
};

const makeSut = (): SutTypes => {
  const loadOneContactStub = makeLoadAllContactStub();
  const sut = new LoadOneContactController(loadOneContactStub);
  return {
    sut,
    loadOneContactStub,
  };
};

describe("LoadOneContact Controller", () => {
  test("Should call LoadOneContact with correct values", async () => {
    const { sut, loadOneContactStub } = makeSut();
    const loadOneContactSpy = jest.spyOn(loadOneContactStub, "loadOne");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadOneContactSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if LoadOneContact throws", async () => {
    const { sut, loadOneContactStub } = makeSut();
    jest
      .spyOn(loadOneContactStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load one Contact and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeContact()));
  });
});
