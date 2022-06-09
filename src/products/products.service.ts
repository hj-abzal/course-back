import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductsDto } from "./dto/create-products.dto";
import { Product, ProductDocument } from "./schema/products.schema";

@Injectable({})
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>
  ) {
  }

  async create(dto: CreateProductsDto): Promise<Product> {
    return await this.ProductModel.create({ ...dto});
  }

  async getALl(): Promise<Product[]> {
    return this.ProductModel.find();
  }

  async getOne(id: ObjectId): Promise<Product> {
    return this.ProductModel.findById(id)
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const res = await this.ProductModel.findByIdAndDelete(id);
    return res._id;
  }
}