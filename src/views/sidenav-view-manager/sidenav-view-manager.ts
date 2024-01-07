import { Injectable } from '@nestjs/common';
import { AppData } from 'src/models/app-data/app-data';
import { SIDENAV_BUTTON_LABEL } from 'src/models/button-data';
import { EVENT_DATA, APP_EVENTS } from 'src/models/constants';
import { VIEW_ID } from 'src/models/view-object-defintions';
import { AppLogger } from 'src/utils/logger/app-logger';

@Injectable()
export class SidenavViewManager {
    private logger = new AppLogger(SidenavViewManager.name);
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
    let path = this.appData.view[VIEW_ID.VW_SIDENAV];
    switch (path.data[type].lbl) {
      case SIDENAV_BUTTON_LABEL.SYSTEM: {
        path.data[0].caret?path.data[0].caret=false:path.data[0].caret=true;
        path.data[0].class === "bi-caret-right" ? path.data[0].class = "bi-caret-down" : path.data[0].class = "bi-caret-right";
        this.target = path.renderFile;
        break;
      }
      case SIDENAV_BUTTON_LABEL.USER: {
        break;
      }
    }
    return this.target;
  }
}
