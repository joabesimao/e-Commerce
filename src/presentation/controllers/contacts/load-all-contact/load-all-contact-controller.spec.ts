import { LoadAllContactController } from "./load-all-contact-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Contacts,
  ContactsModel,
} from "../../../../domain/models/contacts/contact";
import { LoadAllContact } from "../../../../domain/usescase/contact/load-contact/load-contact";

const makeFakeContactModel = (): ContactsModel => ({
  email: "any_email",
  phone: "123456",
  phoneSecundary: "123456",
});

const makeFakeContact = (): Contacts[] => [
  {
    id: 1,
    email: "any_email",
    phone: "123456",
    phoneSecundary: "123456",
  },
  {
    id: 2,
    email: "other_email",
    phone: "32165412",
    phoneSecundary: "6547899",
  },
];

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeContactModel(),
});

interface SutTypes {
  sut: LoadAllContactController;
  loadAllContactStub: LoadAllContact;
}
const makeLoadAllContactStub = (): LoadAllContact => {
  class LoadAllContactStub implements LoadAllContact {
    async load(): Promise<Contacts[]> {
      return new Promise((resolve) => resolve(makeFakeContact()));
    }
  }
  return new LoadAllContactStub();
};

const makeSut = (): SutTypes => {
  const loadAllContactStub = makeLoadAllContactStub();
  const sut = new LoadAllContactController(loadAllContactStub);
  return {
    sut,
    loadAllContactStub,
  };
};

describe("LoadAllContact Controller", () => {
  test("Should call LoadAllContact with correct values", async () => {
    const { sut, loadAllContactStub } = makeSut();
    const loadAllContactSpy = jest.spyOn(loadAllContactStub, "load");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadAllContactSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadAllContact throws", async () => {
    const { sut, loadAllContactStub } = makeSut();
    jest
      .spyOn(loadAllContactStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load all Contact and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeContact()));
  });
});
