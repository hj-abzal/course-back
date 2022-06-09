import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type WorkerDocument = Wokrer & Document;

@Schema()
export class Wokrer {
  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  password: string;

  @Prop()
  position: string;

  @Prop()
  description: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Wokrer);