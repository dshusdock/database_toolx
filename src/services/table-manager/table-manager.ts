import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { BTN_SQL_QUERIES_MAP_DEF, EVENT_DATA } from "src/models/constants";
import { MysqlService } from "../mysql/mysql.service";
import { VIEW_ID } from "src/models/view-object-defintions";

@Injectable()
export class TableManager {
  private tableGroup: BTN_SQL_QUERIES_MAP_DEF[] = [];

  constructor(
    private appData: AppData,
    private readonly mysqlSvc: MysqlService,
  ) {}

  processEvent(eventData: EVENT_DATA) {}

  async setCurrentSQLObject(obj: BTN_SQL_QUERIES_MAP_DEF) {
    const path = this.appData.view[VIEW_ID.VW_TABLE];
    const start = path.data[3].start;
    const end = path.data[3].start + path.data[3].rowCount;
    this.tableGroup.push(obj);

    let rows = await this.mysqlSvc.query(obj.sqlStr);
    this.appData.view[2].data[2].row = rows.slice(start, end);
    this.appData.view[2].data[1].hdr = [...obj.header];
    this.appData.view[2].data[0].tableName = obj.type;
  }
}
