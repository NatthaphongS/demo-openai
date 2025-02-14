import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('raw-product-data-model')
  getProduct() {
    return this.productService.getProductVariantSearchModel();
  }

  @Post('create-index')
  createProductIndex() {
    return this.productService.createProductIndex();
  }

  @Post('dump-products')
  dumpProductData() {
    return this.productService.dumpProduct();
  }

  @Get('search')
  searchProduct(@Query('query') query: string) {
    return this.productService.searchProduct(query);
  }
}
