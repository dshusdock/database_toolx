import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import {
  APP_EVENTS,
  BTN_SQL_QUERIES_MAP_DEF,
  EVENT_DATA,
} from "src/models/constants";
import { MysqlService } from "../../services/mysql/mysql.service";
import { VIEW_ID } from "src/models/view-object-defintions";
import { AppLogger } from "src/utils/logger/app-logger";
import { TABLE_BUTTON_LABEL } from "src/models/button-data";

@Injectable()
export class TableViewManager {
  private logger = new AppLogger(TableViewManager.name);
  private tableGroup: BTN_SQL_QUERIES_MAP_DEF[] = [];
  targetView: string = "partials/table";

  constructor(
    private appData: AppData,
    private readonly mysqlSvc: MysqlService,
  ) {}

  processEvent(eventData: EVENT_DATA) {
    this.logger.log(`Entering processEvent -  ${JSON.stringify(eventData)}`);

    try {
      switch (eventData.event) {
        case APP_EVENTS.EV_CLICK: {
          this.btnHandlerNavigate(eventData);
          break;
        }
      }
    } catch (err) {
      this.logger.error(err);
    }
    return this.targetView;
  }

  async btnHandlerNavigate(data) {
    let path = this.appData.view[VIEW_ID.VW_TABLE];

    this.logger.log(`Entering btnHandlerNavigate `);

    switch (data.label) {
      case TABLE_BUTTON_LABEL.NEXT: {
        await this.displayNextRows();
        break;
      }
      case TABLE_BUTTON_LABEL.PREVIOUS: {
        await this.displayPreviousRows();
        break;
      }
    }
  }

  async displayNextRows() {
    const path = this.appData.view[VIEW_ID.VW_TABLE];
    let rows = await this.mysqlSvc.query(path.data[4].query);
    let start = path.data[3].start;
    let rowCount = path.data[3].rowCount;
    let size = path.data[3].size;
    
    start+=rowCount;
    if (start > size){ return }

    this.appData.view[2].data[3].start = start;
    let end = start + rowCount;
    console.log("start: " + start) 
    console.log("end: " + end) 
    // console.log("rows: " + JSON.stringify(rows))
    this.appData.view[2].data[2].row = rows.slice(start, end);
  }

  async displayPreviousRows() {
    const path = this.appData.view[VIEW_ID.VW_TABLE];
    let rows = await this.mysqlSvc.query(path.data[4].query);
    let start = path.data[3].start;
    let rowCount = path.data[3].rowCount;
    let size = path.data[3].size;

    start-=rowCount;
    if (start < 0) { start = 0 }
    this.appData.view[2].data[3].start = start;

    let end = start + rowCount;
    console.log("start: " + start) 
    console.log("end: " + end) 
    // console.log("rows: " + JSON.stringify(rows))
    this.appData.view[2].data[2].row = rows.slice(start, end);
  }

  async setCurrentSQLObject(obj: BTN_SQL_QUERIES_MAP_DEF) {
   
    const path = this.appData.view[VIEW_ID.VW_TABLE];
    path.data[4].query = obj.sqlStr;
    path.data[3].star = 0;
    const start = path.data[3].start;
    const end = path.data[3].start + path.data[3].rowCount;
    this.tableGroup.push(obj);

    let rows = await this.mysqlSvc.query(obj.sqlStr);
    this.appData.view[2].data[3].size = rows.length;
    console.log("The size is: " + this.appData.view[2].data[3].size + " rows");
    this.appData.view[2].data[2].row = rows.slice(start, end);
    this.appData.view[2].data[1].hdr = [...obj.header];
    this.appData.view[2].data[0].tableName = obj.type;
   
  }
}
