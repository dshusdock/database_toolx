import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { AppLogger } from "src/utils/logger/app-logger";
import { APP_EVENTS, APP_STATE, EVENT_DATA, SUCCESS, VIEW_TYPE } from 'src/models/constants';
import { VIEW_ID } from 'src/models/view-object-defintions';
import { MainViewManager } from "src/views/main-view-manager/main-view-manager";
import { AppheaderViewManager } from "src/views/appheader-view-manager/appheader-view-manager";
import { SidenavViewManager } from "src/views/sidenav-view-manager/sidenav-view-manager";

@Injectable()
export class MainService {
    private logger = new AppLogger(MainService.name)
    appState: APP_STATE;

  constructor(
    private appData: AppData, 
    private readonly mainViewMgr: MainViewManager,
    private readonly AppheaderViewManager: AppheaderViewManager,
    private readonly sidenavViewMgr: SidenavViewManager ) {
  }

  async init() {
    this.appState = APP_STATE.INIT;
    if (await this.appData.init() === SUCCESS) {
        this.logger.log("App Init...");
    }

  }

  async getInitialState(): Promise<AppData> {
    await this.appData.init();

    return this.appData;
  }

  getAppData() {
    return this.appData;

  }

  processEvent(event: APP_EVENTS, params?: any) {
    this.logger.log(`Entering processRequest - event: ${event} id: ${params.id} type: ${params.type}`);
    const dataObj: EVENT_DATA = {
      event: event,
      id: parseInt(params.id),
      type: params.type,
      index: parseInt(params.index)
    };

    const target = this.routeRequest(dataObj);
    return { target, appData: this.appData, }
  }

  routeRequest(data: EVENT_DATA) {
    let target: any;

    this.logger.log(`Entering routeRequest - event: ${data.event} id: ${data.id} type: ${data.type}`)

    switch (data.id) {
      case VIEW_ID.VW_INDEX:
      case VIEW_ID.VW_APPHEADER: {
        target = this.AppheaderViewManager.processEvent(data);
        break;
      }
      case VIEW_ID.VW_TABLETEST: {
        break;
      } 
      case VIEW_ID.VW_SIDENAV: {       
        target = this.sidenavViewMgr.processEvent(data);
        break;
      }    
      default: {
        target = "";
      }
    }
    return target;
  }
}
