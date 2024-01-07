import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { HDR_BUTTON_LABEL } from "src/models/button-data";
import { APP_EVENTS, EVENT_DATA } from "src/models/constants";
import { VIEW_ID } from "src/models/view-object-defintions";
import { AppLogger } from "src/utils/logger/app-logger";

@Injectable()
export class AppheaderViewManager {
  private logger = new AppLogger(AppheaderViewManager.name);
  target: string = "";

  constructor(private appData: AppData) {}

  processEvent(data: EVENT_DATA) {
    this.logger.log(
      `Entering processRequest - event: ${data.event} id: ${data.id} type: ${data.type}`,
    );

    switch (data.event) {
      case APP_EVENTS.EV_CLICK: {
        this.pageHandler_clickEvent(data.type);
        break;
      }
    }

    return this.target;
  }

  pageHandler_clickEvent(type) {
    let path = this.appData.view[VIEW_ID.VW_APPHEADER];

    switch (path.data[type].lbl) {
      case HDR_BUTTON_LABEL.HOME: {
        break;
      }
      case HDR_BUTTON_LABEL.LOAD_DB: {
        break;
      }
    }
  }
}
