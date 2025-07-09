export interface DeleteAddressById {
  delete(id: number): Promise<string>;
}
