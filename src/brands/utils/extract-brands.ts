import { Products } from '@prisma/client';

export function extractUniqueBrands(products: Products[]): string[] {
  const brandSet = new Set<string>();

  products.forEach((product) => {
    if (product.brand) {
      brandSet.add(product.brand);
    }
  });

  return Array.from(brandSet).filter((brand) => brand !== '');
}
