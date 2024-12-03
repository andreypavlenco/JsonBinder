import { BadRequestException, Injectable } from '@nestjs/common';
import { FileReadService } from 'src/fs/fs.read/fs.read.service';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';
import { extractUniqueBrands } from './utils/extract-brands';

@Injectable()
export class BrandsCreateService {
  constructor(
    private readonly brandRepository: BrandsRepository,
    private readonly readFileService: FileReadService,
  ) {}

  async createFromFile(filePath: string) {
    try {
      const products = await this.readFileService.readData(filePath);
      const uniqueBrands = extractUniqueBrands(products);

      return await this.createManyFromList(uniqueBrands);
    } catch (error) {
      throw new BadRequestException(
        'Error reading products or creating brands',
        error,
      );
    }
  }

  async createManyFromList(brands: string[]) {
    try {
      const createBrandsDto: CreateBrandsDto[] = brands.map((brand) => ({
        name: brand,
      }));

      return await this.brandRepository.createMany(createBrandsDto);
    } catch (error) {
      throw new BadRequestException('Error creating many brands', error);
    }
  }

  async findAll() {
    try {
      return await this.brandRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
