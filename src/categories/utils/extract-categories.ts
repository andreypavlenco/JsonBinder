import { Products } from '@prisma/client';

export function extractUniqueCategories(products: Products[]): string[] {
  const categoryNames = products.map((product) => product.title.split(' ')[0]);

  return Array.from(new Set(categoryNames)).filter((name) => name !== '');
}
