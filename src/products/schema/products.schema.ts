import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: string;

  @Prop()
  status: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);