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

  processEvent(eventData: EVENT_DATA) {
    this.logger.log(
      `Entering processRequest - ${JSON.stringify(eventData)}`,
    );

    switch (eventData.event) {
      case APP_EVENTS.EV_CLICK: {
        this.pageHandler_clickEvent(eventData.label);
        break;
      }
    }

    return this.target;
  }

  pageHandler_clickEvent(label) {
    let path = this.appData.view[VIEW_ID.VW_APPHEADER];

    switch (label) {
      case HDR_BUTTON_LABEL.HOME: {
        break;
      }
      case HDR_BUTTON_LABEL.LOAD_DB: {
        break;
      }
    }
  }
}
