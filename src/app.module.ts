import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MainController } from "./controllers/main/main.controller";
import { AppLogger } from "./utils/logger/app-logger";
import { MainService } from './controllers/main/main.service';
import { AppData } from "./models/app-data/app-data";

@Module({
  imports: [],
  controllers: [AppController, MainController],
  providers: [AppLogger, MainService, AppData],
})
export class AppModule {}
