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
      `Entering processRequest - event: ${data.event} id: ${data.id} type: ${data.type} index: ${data.index}`,
    );

    switch (data.event) {
      case APP_EVENTS.EV_CLICK: {
        this.pageHandler_clickEvent(data);
        break;
      }
    }

    return this.target;
  }

  pageHandler_clickEvent(data) {
    let path = this.appData.view[VIEW_ID.VW_SIDENAV];
    switch (path.data[data.type].lbl) {
      case SIDENAV_BUTTON_LABEL.USER:
      case SIDENAV_BUTTON_LABEL.SYSTEM: {
        path.data[data.type].caret?path.data[data.type].caret=false:path.data[data.type].caret=true;
        path.data[data.type].class === "bi-caret-right" ? path.data[data.type].class = "bi-caret-down" : path.data[data.type].class = "bi-caret-right";
        this.target = path.renderFile;
        break;
      }
    }
    return this.target;
  }
}
