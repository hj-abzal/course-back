import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./products/products.module";
import { WorkerModule } from "./workers/worker.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Suan7:suan7777@cluster0.xaflp.mongodb.net/music-platform?retryWrites=true&w=majority"),
    ProductsModule,
    WorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
