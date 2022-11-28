import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { findProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch('update')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: findProductDto) {}
}
