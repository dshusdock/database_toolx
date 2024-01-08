import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { AppLogger } from "src/utils/logger/app-logger";
import { APP_EVENTS, APP_STATE, EVENT_DATA, SUCCESS, VIEW_TYPE } from 'src/models/constants';
import { VIEW_ID } from 'src/models/view-object-defintions';
import { MainViewManager } from "src/views/main-view-manager/main-view-manager";
import { AppheaderViewManager } from "src/views/appheader-view-manager/appheader-view-manager";
import { SidenavViewManager } from "src/views/sidenav-view-manager/sidenav-view-manager";
import { TableManager } from "src/services/table-manager/table-manager";

@Injectable()
export class MainService {
    private logger = new AppLogger(MainService.name)
    appState: APP_STATE;

  constructor(
    private appData: AppData, 
    private readonly mainViewMgr: MainViewManager,
    private readonly appHeaderViewManager: AppheaderViewManager,
    private readonly sidenavViewMgr: SidenavViewManager,
    private readonly tableMgr: TableManager ) {
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
    this.logger.log(`Entering processRequest - ${JSON.stringify(params)}`);
    const eventData: EVENT_DATA = {
      event: event,
      viewId: params.view_id?parseInt(params.view_id):null,
      viewStr: params.view_str?params.view_str:null,
      label: params.label,
      index: parseInt(params.index),
      subIndex: params.sub_index?parseInt(params.sub_index):null
    };

    const targetView = this.routeRequest(eventData);
    console.log("Here target is: " + targetView);
    return { targetView, appData: this.appData, }
  }

  routeRequest(eventData: EVENT_DATA) {
    let targetView: any;

    this.logger.log(`Entering routeRequest - viewId: ${eventData.viewId}`);

    switch (eventData.viewId) {
      case VIEW_ID.VW_INDEX:
      case VIEW_ID.VW_APPHEADER: {
        targetView = this.appHeaderViewManager.processEvent(eventData);
        break;
      }
      case VIEW_ID.VW_TABLETEST: {
        targetView = this.tableMgr.processEvent(eventData);
        break;
      } 
      case VIEW_ID.VW_SIDENAV: {       
        targetView = this.sidenavViewMgr.processEvent(eventData);
        console.log("and here also the target is :" + targetView)
        break;
      }    
      default: {
        targetView = "";
      }
    }
    console.log("and here target is :" + targetView)
    return targetView;
  }
}
