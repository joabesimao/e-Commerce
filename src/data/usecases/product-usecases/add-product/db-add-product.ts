import { Product } from "../../../../domain/models/product/product";
import {
  AddProduct,
  AddProductModel,
} from "../../../../domain/usescase/product/add-product/add-product";
import { AddProductRepository } from "../../../protocols/db/product/add-product";

export class DbAddProduct implements AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}
  async add(product: AddProductModel): Promise<Product> {
    const addProduct = await this.addProductRepository.add(product);
    return addProduct;
  }
}
