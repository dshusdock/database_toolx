import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { APP_EVENTS, EVENT_DATA } from "src/models/constants";
import { VIEW_ID } from "src/models/view-object-defintions";

import { AppLogger } from "src/utils/logger/app-logger";

@Injectable()
export class MainViewManager {
  private logger = new AppLogger(MainViewManager.name);
  target: string = "";

  constructor(private appData: AppData) {}

  processEvent(data: EVENT_DATA) {
    this.logger.log(
      `Entering processRequest - event: ${data.event} id: ${data.id} type: ${data.type}`,
    );

    switch (data.id) {
      case VIEW_ID.VW_INDEX: {
        // this.partialHandler_DCDetails(data.event, data.type);
        break;
      }
      case VIEW_ID.VW_TABLETEST: {
        //this.partialHandler_SideNav(data.event, data.type);
        break;
      }
      case VIEW_ID.VW_APPHEADER: {
        //this.partialHandler_NodeSummary(data.event, data.type)
        break;
      }
    }

    return this.target;
  }

  pageHandler_Index(event, type) {
    let path = this.appData.view[VIEW_ID.VW_INDEX];
    switch (event) {
      case APP_EVENTS.EV_CLICK:
        {
        }

        //note:set the target
        break;
    }
  }
}
