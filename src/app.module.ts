import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MainController } from "./controllers/main/main.controller";
import { AppLogger } from "./utils/logger/app-logger";
import { MainService } from './controllers/main/main.service';
import { AppData } from "./models/app-data/app-data";
import { MysqlService } from './services/mysql/mysql.service';
import { MainViewManager } from './views/main-view-manager/main-view-manager';
import { AppheaderViewManager } from './views/appheader-view-manager/appheader-view-manager';
import { SidenavViewManager } from './views/sidenav-view-manager/sidenav-view-manager';
import { SqlQueryManager } from './services/sql-query-manager/sql-query-manager';
import { TableViewManager } from './views/table-view-manager/table-view-manager';

@Module({
  imports: [],
  controllers: [AppController, MainController],
  providers: [AppLogger, MainService, AppData, MysqlService, MainViewManager, AppheaderViewManager, SidenavViewManager, SqlQueryManager, TableViewManager],
})
export class AppModule {}
