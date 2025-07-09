export interface DeleteContactById {
  delete(id: number): Promise<string>;
}
