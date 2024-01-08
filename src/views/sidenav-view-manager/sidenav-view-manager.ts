import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { SIDENAV_BUTTON_LABEL } from "src/models/button-data";
import { EVENT_DATA, APP_EVENTS } from "src/models/constants";
import { VIEW_ID } from "src/models/view-object-defintions";
import { MysqlService } from "src/services/mysql/mysql.service";
import { AppLogger } from "src/utils/logger/app-logger";
import { BTN_SQL_QUERIES_MAP } from "../../services/sql-query-manager/sql-queries";

@Injectable()
export class SidenavViewManager {
  private logger = new AppLogger(SidenavViewManager.name);
  targetView: string = "";

  constructor(
    private appData: AppData,
    private readonly mysqlSvc: MysqlService,
  ) {}

  processEvent(eventData: EVENT_DATA) {
    this.logger.log(`Entering processEvent -  ${JSON.stringify(eventData)}`);
    let target = "";

    switch (eventData.event) {
      case APP_EVENTS.EV_CLICK: {
        this.buttonHandler_clickEvent(eventData);
        break;
      }
    }
    console.log("and look here target is :" + this.targetView)
    return this.targetView;
  }

  async buttonHandler_clickEvent(data) {
    let path = this.appData.view[VIEW_ID.VW_SIDENAV];

    this.logger.log(`Entering buttonHandler_clickEvent - ${JSON.stringify(path)}`);
    if (data.subIndex === null) {
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
    } else {
      console.log("HERE")
      let obj = BTN_SQL_QUERIES_MAP.find((el) => {
        if (el.type.localeCompare(data.label) === 0) {
          return el;
        }
      });

      let rows = await this.mysqlSvc.query(obj.sqlStr);
      this.appData.view[2].data[2].row = [...rows];
      this.appData.view[2].data[1].hdr = [...obj.header];
      this.appData.view[2].data[0].tableName = obj.type;

      this.targetView = path.altRenderFile;
      console.log("Target - " + this.targetView);

      return this.targetView;
    }
  }
}
