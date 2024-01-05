import { Controller, Get } from "@nestjs/common";
import { MysqlService } from "./services/mysql/mysql.service";

@Controller("app")
export class AppController {
  constructor(private readonly mysqlSvc: MysqlService) {}

  @Get("simplequery")
  testSimpleQuery() {
    this.mysqlSvc.simpleQuery();
  }
}
