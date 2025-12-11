import { AddProductRepository } from "../../../../data/protocols/db/product/add-product";
import { DeleteProductRepository } from "../../../../data/protocols/db/product/delete-product";
import { LoadAllProductRepository } from "../../../../data/protocols/db/product/load-all-product";
import { LoadOneProductRepository } from "../../../../data/protocols/db/product/load-one-product";
import { UpdateProductRepository } from "../../../../data/protocols/db/product/update-product";
import { Product } from "../../../../domain/models/product/product";
import { AddProductModel } from "../../../../domain/usescase/product/add-product/add-product";
import { prisma } from "../../../../config/prisma";

export class ProductRepository
  implements
    AddProductRepository,
    LoadAllProductRepository,
    LoadOneProductRepository,
    UpdateProductRepository,
    DeleteProductRepository
{
  async add(product: AddProductModel): Promise<Product> {
    const { category, description, name, price } = product;
    const addAddress = await prisma.product.create({
      data: {
        name: name,
        category: category,
        description: description,
        price: price,
      },
    });
    return addAddress;
  }
  async update(id: number, info: Partial<Product>): Promise<Product> {
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: { ...info },
    });
    return updateProduct;
  }
  async loadOne(id: number): Promise<Product> {
    const oneProduct = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    return oneProduct;
  }

  async loadAll(): Promise<Product[]> {
    const loadAllProduct = await prisma.product.findMany({
      select: {
        name: true,
        category: true,
        description: true,
        price: true,
      },
    });
    return loadAllProduct;
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
