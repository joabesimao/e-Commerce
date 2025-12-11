import { AddAddressRepository } from "../../../../data/protocols/db/address/add-address";
import { DeleteAddressRepository } from "../../../../data/protocols/db/address/delete-address";
import { LoadAllAddressRepository } from "../../../../data/protocols/db/address/load-all-address";
import { LoadOneAddressRepository } from "../../../../data/protocols/db/address/load-one-address";
import { UpdateAddressRepository } from "../../../../data/protocols/db/address/update-address";
import { Address } from "../../../../domain/models/address/address";
import { AddAddressModel } from "../../../../domain/usescase/address/add-address/add-address";
import { prisma } from "../../../../config/prisma";

export class AddressRepository
  implements
    AddAddressRepository,
    LoadAllAddressRepository,
    LoadOneAddressRepository,
    UpdateAddressRepository,
    DeleteAddressRepository
{
  async add(address: AddAddressModel): Promise<Address> {
    const { cep, city, neighborhood, numberHouse, reference, street } = address;
    const addAddress = await prisma.address.create({
      data: {
        cep: cep,
        city: city,
        neighborhood: neighborhood,
        numberHouse: numberHouse,
        reference: reference,
        street: street,
      },
    });
    return addAddress as unknown as Address;
  }

  async loadAll(): Promise<Address[]> {
    const loadAllAddress = await prisma.address.findMany({
      select: {
        cep: true,
        city: true,
        neighborhood: true,
        numberHouse: true,
        reference: true,
        street: true,
      },
    });
    return loadAllAddress;
  }

  async loadOne(id: number): Promise<Address> {
    const oneAddress = await prisma.address.findUnique({
      where: {
        id: Number(id),
      },
    });
    return oneAddress;
  }

  async update(id: number, info: Partial<Address>): Promise<Address> {
    const updateAddress = await prisma.address.update({
      where: {
        id: Number(id),
      },
      data: { ...info },
    });
    return updateAddress;
  }

  async delete(id: number): Promise<string> {
    await prisma.address.delete({
      where: {
        id: Number(id),
      },
    });
    return "Successfully Deleted!";
  }
}
