import { BadRequestException, Injectable } from '@nestjs/common';
import { Categories, Products } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FileReadService } from 'src/fs/fs.read/fs.read.service';

@Injectable()
export class CategoriesCreateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly readFile: FileReadService,
  ) {}

  async create() {
    //  const categories: string[] = await this.parse();
    // return await this.prisma.categories.createMany({
    //   data: categories.map((category) => ({
    //     name: category,
    //     createdAt: new Date(),
    //   })),
    // });
  }

  // async parse() {
  //   try {
  //     const products: Products[] = await this.readFile.readData(
  //       './data/products.json',
  //     );
  //     const namesCategiries: string[] = [];

  //     products.forEach((product) => {
  //       namesCategiries.push(product.title);
  //     });
  //     const categiries: string[] = namesCategiries.map(
  //       (item) => item.match(/^\S+/)[0],
  //     );
  //     const uniqueСategiries = Array.from(new Set(categiries));
  //     return uniqueСategiries;
  //   } catch (error) {
  //     console.error('Error inserting products:', error);
  //   }
  // }

  async findAll() {
    try {
      return await this.prisma.categories.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
