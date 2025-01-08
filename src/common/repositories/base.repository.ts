export abstract class BaseRepository<TypeModel, CreateDto, UpdateDto> {
  constructor(private readonly entity: any) {}

  get getEntity() {
    return this.entity;
  }

  createMany(dto: CreateDto[]): Promise<TypeModel[]> {
    return this.getEntity.createMany({ data: dto });
  }

  findAll(): Promise<TypeModel[]> {
    return this.getEntity.findMany();
  }

  findById(id: string): Promise<TypeModel | null> {
    return this.getEntity.findUnique({
      where: {
        id,
      },
    });
  }

  delete(id: string): Promise<TypeModel> {
    return this.getEntity.delete({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateDto): Promise<TypeModel> {
    return this.getEntity.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
