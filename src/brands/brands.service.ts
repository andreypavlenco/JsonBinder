import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';

@Injectable()
export class BrandsCreateService {
  constructor(
    private readonly brandRepository: BrandsRepository,
    private readonly readFileService: FileReadService, // сервис для чтения данных из файлов
  ) {}

  async createFromFile(filePath: string) {
    try {
      const products = await this.readFileService.readData(filePath);
      const uniqueBrands = this.extractUniqueBrands(products);

      return await this.createManyFromList(uniqueBrands);
    } catch (error) {
      throw new BadRequestException('Error reading products or creating brands', error);
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

  private extractUniqueBrands(products: Products[]): string[] {
    const brandSet = new Set<string>();

    products.forEach((product) => {
      if (product.brand) {
        brandSet.add(product.brand);
      }
    });

    return Array.from(brandSet).filter(brand => brand !== '');
  }

  async findAll() {
    try {
      return await this.brandRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

