import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { SIDENAV_BUTTON_LABEL } from "src/models/button-data";
import { EVENT_DATA, APP_EVENTS } from "src/models/constants";
import { VIEW_ID } from "src/models/view-object-defintions";
import { MysqlService } from "src/services/mysql/mysql.service";
import { AppLogger } from "src/utils/logger/app-logger";
import { BTN_SQL_QUERIES_MAP } from "../../services/sql-query-manager/sql-queries";
import { TableViewManager } from "../table-view-manager/table-view-manager";

@Injectable()
export class SidenavViewManager {
  private logger = new AppLogger(SidenavViewManager.name);
  targetView: string = "partials/table";

  constructor(
    private appData: AppData,
    private readonly tableMgr: TableViewManager,
  ) {}

  processEvent(eventData: EVENT_DATA) {
    this.targetView = "";
    this.logger.log(`Entering processEvent -  ${JSON.stringify(eventData)}`);

    try {
      switch (eventData.event) {
        case APP_EVENTS.EV_CLICK: {
          if (eventData.subIndex === null) {
            this.btnHandlerCategorySelect(eventData);
          } else {
            this.btnHandlerTableSelect(eventData);
          }
          break;
        }
      }
    } catch (err) {
      this.logger.error(err);
    }
    console.log("and look here target is :" + this.targetView);
    return this.targetView;
  }

  async btnHandlerCategorySelect(data) {
    let path = this.appData.view[VIEW_ID.VW_SIDENAV];

    this.logger.log(
      `Entering buttonHandler_clickEvent `,
    );

    switch (data.label) {
      case SIDENAV_BUTTON_LABEL.USER:
      case SIDENAV_BUTTON_LABEL.RECORDING:
      case SIDENAV_BUTTON_LABEL.SYSTEM: {
        path.data[data.index].caret
          ? (path.data[data.index].caret = false)
          : (path.data[data.index].caret = true);
        path.data[data.index].class === "bi-caret-right"
          ? (path.data[data.index].class = "bi-caret-down")
          : (path.data[data.index].class = "bi-caret-right");
        this.targetView = path.renderFile;
        break;
      }
    }
  }

  async btnHandlerTableSelect(data) {
    this.appData.view[VIEW_ID.VW_INDEX].viewFlags[0] = true;
    const path = this.appData.view[VIEW_ID.VW_TABLE];
    this.targetView = path.renderFile;

    let obj = BTN_SQL_QUERIES_MAP.find((el) => {
      if (el.type.localeCompare(data.label) === 0) {
        return el;
      }
    });

    await this.tableMgr.setCurrentSQLObject(obj);

    return this.targetView;
  }
}
