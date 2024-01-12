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

  async processEvent(eventData: EVENT_DATA) {
    this.logger.log(`Entering processEvent -  ${JSON.stringify(eventData)}`);

    try {
      switch (eventData.event) {
        case APP_EVENTS.EV_CLICK: {
          await this.btnHandlerNavigate(eventData);
          break;
        }
        case APP_EVENTS.SEARCH: {
          await this.tableSearchHandler(eventData.search);
          break;
        }
      }
    } catch (err) {
      this.logger.error(err);
    }
    return this.targetView;
  }

  async btnHandlerNavigate(data) {
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

  async tableSearchHandler(searchStr: string) {
    this.logger.log(`Entering tableSearchHandler `);
    let row: string[] = [];
    let newData: any[] = [];
    this.appData.view[VIEW_ID.VW_TABLE].data[5].searchInputValue = searchStr;
    
    let rows = await this.mysqlSvc.query(
    this.appData.view[VIEW_ID.VW_TABLE].data[4].query);
    for (let x = 0; x < rows.length; x++) {
      let rowCaptured = false;
      for (const key in rows[x]) {
        let str: string = rows[x][key];
        if (str === null) { continue }
        if (str.toString().toLowerCase().includes(searchStr.toString().toLowerCase())) {
          
          if (!rowCaptured) {
            newData.push(rows[x]);
            rowCaptured = true;
          }   
          console.log("Pushing Row  " + JSON.stringify(rows[x]))       
        }
      }
    }
    this.appData.view[VIEW_ID.VW_TABLE].data[2].row = [...newData];
    console.log("A")
    return;
  }

  async displayNextRows() {
    //const path = this.appData.view[VIEW_ID.VW_TABLE];
    let rows = await this.mysqlSvc.query(
      this.appData.view[VIEW_ID.VW_TABLE].data[4].query,
    );
    let start = this.appData.view[VIEW_ID.VW_TABLE].data[3].start;
    let rowCount = this.appData.view[VIEW_ID.VW_TABLE].data[3].rowCount;
    let size = this.appData.view[VIEW_ID.VW_TABLE].data[3].size;

    start += rowCount;
    if (start > size) {
      return;
    }

    this.appData.view[2].data[3].start = start;
    let end = start + rowCount;
    this.appData.view[2].data[2].row = rows.slice(start, end);
  }

  async displayPreviousRows() {
    //const path = this.appData.view[VIEW_ID.VW_TABLE];
    let rows = await this.mysqlSvc.query(
      this.appData.view[VIEW_ID.VW_TABLE].data[4].query,
    );
    let start = this.appData.view[VIEW_ID.VW_TABLE].data[3].start;
    let rowCount = this.appData.view[VIEW_ID.VW_TABLE].data[3].rowCount;
    let size = this.appData.view[VIEW_ID.VW_TABLE].data[3].size;

    start -= rowCount;
    if (start < 0) {
      start = 0;
    }
    this.appData.view[2].data[3].start = start;
    let end = start + rowCount;
    this.appData.view[2].data[2].row = rows.slice(start, end);
  }

  setCurrentSQLObject = async (obj: BTN_SQL_QUERIES_MAP_DEF): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      this.appData.view[VIEW_ID.VW_TABLE].data[4].query = obj.sqlStr;
      this.appData.view[VIEW_ID.VW_TABLE].data[3].start = 0;
      const start = this.appData.view[VIEW_ID.VW_TABLE].data[3].start;
      const end =
        this.appData.view[VIEW_ID.VW_TABLE].data[3].start +
        this.appData.view[VIEW_ID.VW_TABLE].data[3].rowCount;
      this.tableGroup.push(obj);

      let rows = await this.mysqlSvc.query(obj.sqlStr);
      this.appData.view[2].data[3].size = rows.length;
      this.logger.log(
        "Received size is: " + this.appData.view[2].data[3].size + " rows",
      );

      this.appData.view[2].data[2].row = rows.slice(start, end);
      this.appData.view[2].data[1].hdr = [...obj.header];
      this.appData.view[2].data[0].tableName = obj.type;
      resolve();
    });
  };
}
