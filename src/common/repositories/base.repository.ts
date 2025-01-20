export abstract class BaseRepository<TypeModel, CreateDto, UpdateDto> {
  constructor(private readonly entity: any) {}

  createMany(dto: CreateDto[]): Promise<TypeModel[]> {
    return this.entity.createMany({ data: dto });
  }

  findAll(): Promise<TypeModel[]> {
    return this.entity.findMany();
  }

  findById(id: string): Promise<TypeModel | null> {
    return this.entity.findUnique({
      where: {
        id,
      },
    });
  }

  delete(id: string): Promise<TypeModel> {
    return this.entity.delete({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateDto): Promise<TypeModel> {
    return this.entity.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
