export interface DeleteProductRepository {
  delete(id: number): Promise<string>;
}
