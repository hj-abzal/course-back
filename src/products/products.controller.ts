import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateProductsDto } from "./dto/create-products.dto";
import { ProductsService } from "./products.service";
import { ObjectId } from "mongoose";

@Controller("/products")
export class ProductsController {
  constructor(private productService: ProductsService) {
  }

  @Post()
  create(@Body() dto: CreateProductsDto) {
    return this.productService.create(dto);
  }





  @Get()
  getALl() {
    return this.productService.getALl();
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.productService.getOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: ObjectId) {
    return this.productService.delete(id);
  }
}