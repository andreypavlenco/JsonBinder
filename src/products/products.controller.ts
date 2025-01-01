import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductsDto } from './dto/update-products-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductsDto,
  ) {
    return this.productsService.update(id, updateProductsDto);
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.productsService.findId(id);
  }
}
