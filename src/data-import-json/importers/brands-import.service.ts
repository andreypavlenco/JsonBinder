import { BadRequestException, Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { CreateBrandsDto } from '../../modules/brands/dto/create-brands-dto';
import { BrandsService } from '../../modules/brands/brands.service';
import { extractUniqueBrands } from './utils/extract-brands';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { ReadJsonService } from 'src/json-utils/json.read.service';
import { WriteJsonService } from 'src/json-utils/json.write.service';
import { checkUnique } from 'src/common/utils/check-unique';

@Injectable()
export class BrandsImportFormJsonService {
  constructor(
    private readonly brandsServie: BrandsService,
    private readonly readJsonService: ReadJsonService,
    private readonly writeJsonService: WriteJsonService,
  ) {}

  async importUniqueBrands(): Promise<Brands[]> {
    try {
      const productsToJson = await this.readJsonService.readJson();
      const brandNames = extractUniqueBrands(productsToJson);
      const existBrands = await this.brandsServie.findAll();
      const uniqueBrands = checkUnique<Brands, CreateBrandsDto>(
        existBrands,
        brandNames,
      );
      if (uniqueBrands.length === 0) {
        throw new BadRequestException(ERROR_MESSAGES.NO_NEW_BRANDS);
      }
      return this.createBrands(uniqueBrands);
    } catch (error) {
      throw error;
    }
  }

  private async createBrands(dto: CreateBrandsDto[]): Promise<Brands[]> {
    try {
      const brands = await this.brandsServie.createMany(dto);
      this.writeJsonService.writeBrandsToJson(brands);
      return brands;
    } catch (error) {
      throw error;
    }
  }
}
