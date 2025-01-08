import { CreateProductsDto } from 'src/modules/products/dto/create-products-dto';

export function extractUniqueBrands(products: CreateProductsDto[]): string[] {
  const brandSet = new Set<string>();

  products.forEach((product) => {
    if (product.brand) {
      brandSet.add(product.brand);
    }
  });

  return Array.from(brandSet).filter((brand) => brand !== '');
}
