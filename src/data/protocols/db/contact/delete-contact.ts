export interface DeleteContactRepository {
  delete(id: number): Promise<string>;
}
