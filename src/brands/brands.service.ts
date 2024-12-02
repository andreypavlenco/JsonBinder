import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandsRepository } from 'src/repositories/repository/brands.repository';
import { CreateBrandsDto } from './dto/create-brands-dto';

@Injectable()
export class BrandsCreateService {
  constructor(private readonly brandRepository: BrandsRepository) {}

  async createMany(dto: CreateBrandsDto[]) {
    try {
      return await this.brandRepository.createMany(dto);
      // const brands = await this.parse();
      // return this.prisma.brands.createMany({
      //   data: brands.map((brand) => ({
      //     name: brand,
      //   })),
      // });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // async parse() {
  //   try {
  //     const products: Products[] = await this.readFile.readData(
  //       './data/products.json',
  //     );
  //     const brand: string[] = [];

  //     products.forEach((product) => {
  //       brand.push(product.brand);
  //     });
  //     const uniqueBrands = Array.from(new Set(brand)).filter(
  //       (item) => item !== '',
  //     );

  //     return uniqueBrands;
  //   } catch (error) {
  //     console.error('Error inserting products:', error);
  //   }
  // }

  async findAll() {
    try {
      return await this.brandRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
