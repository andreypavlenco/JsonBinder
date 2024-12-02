import { BadRequestException, Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FileReadService } from 'src/fs/fs.read/fs.read.service';

@Injectable()
export class BrandsCreateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly readFile: FileReadService,
  ) {}

  async create() {
    try {
      const brands = await this.parse();
      return this.prisma.brands.createMany({
        data: brands.map((brand) => ({
          name: brand,
        })),
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async parse() {
    try {
      const products: Products[] = await this.readFile.readData(
        './data/products.json',
      );
      const brand: string[] = [];

      products.forEach((product) => {
        brand.push(product.brand);
      });
      const uniqueBrands = Array.from(new Set(brand)).filter(
        (item) => item !== '',
      );

      return uniqueBrands;
    } catch (error) {
      console.error('Error inserting products:', error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.brands.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
