export type IRepository<T, Dto> = {
  createManyFromJson(dto: Dto[]): Promise<T[]>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  delete(id: string): Promise<{ title: string }>;
  update(id: string, dto: Dto): Promise<T>;
};
