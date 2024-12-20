import { CreateProductsDto } from 'src/products/dto/create-products-dto';

export function extractUniqueCategories(
  products: CreateProductsDto[],
): string[] {
  const categoryNames = products.map((product) => product.title.split(' ')[0]);

  return Array.from(new Set(categoryNames)).filter((name) => name !== '');
}
