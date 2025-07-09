import { Address } from "../../../models/address/address";

export interface UpdateAddress {
  update(id: number, info: Partial<Address>): Promise<Address>;
}
