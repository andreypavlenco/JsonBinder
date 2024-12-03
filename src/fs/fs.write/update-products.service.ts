@Injectable()
export class UpdateProductService {
  constructor(
    private readonly brandsService: BrandsCreateService,
    private readonly categoriesService: CategoriesCreateService,
  ) {}

  async updateProductsWithBrandsAndCategories(
    products: Products[],
  ): Promise<Products[]> {
    const brands = await this.brandsService.findAll();
    const categories = await this.categoriesService.findAll();

    return products.map((product) => {
      const updatedProduct = { ...product };

      // Обновление бренда
      const brand = brands.find((brand) => brand.name === product.brand);
      if (brand) {
        updatedProduct.brandId = brand.id;
      }

      // Обновление категории
      const productFirstWord = product.title.split(' ')[0];
      const category = categories.find(
        (category) => category.name.split(' ')[0] === productFirstWord,
      );
      if (category) {
        updatedProduct.categoryId = category.id;
      }

      return updatedProduct;
    });
  }
}
