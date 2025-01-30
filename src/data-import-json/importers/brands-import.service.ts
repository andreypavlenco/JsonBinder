import { BadRequestException, Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { CreateBrandsDto } from '../../modules/brands/dto/create-brands-dto';
import { BrandsService } from '../../modules/brands/brands.service';
import { extractUniqueBrands } from './utils/extract-brands';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages';
import { ReadJsonService } from 'src/json-utils/json.read.service';
import { WriteJsonService } from 'src/json-utils/json.write.service';
import { checkUnique } from 'src/common/utils';

@Injectable()
export class BrandsImportFormJsonService {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly readJsonService: ReadJsonService,
    private readonly writeJsonService: WriteJsonService,
  ) {}
  async importUniqueBrands(): Promise<Brands[]> {
    const [productsToJson, existBrands] = await Promise.all([
      this.readJsonService.readJson(),
      this.brandsService.findAll(),
    ]);
    const brandNames = extractUniqueBrands(productsToJson);
    const uniqueBrands = checkUnique<Brands, CreateBrandsDto>(
      existBrands,
      brandNames,
    );
    if (uniqueBrands.length === 0) {
      throw new BadRequestException(ERROR_MESSAGES.NO_NEW_BRANDS);
    }
    return this.createBrands(uniqueBrands);
  }

  private async createBrands(dto: CreateBrandsDto[]): Promise<Brands[]> {
    const brands = await this.brandsService.createMany(dto);
    await this.writeJsonService.writeBrandsToJson(brands);
    return brands;
  }
}
