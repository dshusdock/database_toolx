import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { AppLogger } from "src/utils/logger/app-logger";
import { APP_DATA, APP_EVENTS, APP_STATE, EVENT_DATA, RENDER_DATA, SUCCESS, VIEW_TYPE } from 'src/models/constants';
import { VIEW_ID } from 'src/models/view-object-defintions';
import { MainViewManager } from "src/views/main-view-manager/main-view-manager";
import { AppheaderViewManager } from "src/views/appheader-view-manager/appheader-view-manager";
import { SidenavViewManager } from "src/views/sidenav-view-manager/sidenav-view-manager";
import { TableViewManager } from "src/views/table-view-manager/table-view-manager";

@Injectable()
export class MainService {
    private logger = new AppLogger(MainService.name)
    appState: APP_STATE;

  constructor(
    private appData: AppData, 
    private readonly mainViewMgr: MainViewManager,
    private readonly appHeaderViewManager: AppheaderViewManager,
    private readonly sidenavViewMgr: SidenavViewManager,
    private readonly tableMgr: TableViewManager ) {
  }

   async init() {
    this.appState = APP_STATE.INIT;
    if ( await this.appData.init() === SUCCESS) {
        this.logger.log("App Init...");
    }

  }

   getInitialState() {
     this.appData.init();

    return this.appData;
  }

  getAppData() {
    return this.appData;

  }

   processEvent = async (event: APP_EVENTS, params?: any): Promise<RENDER_DATA> => {
    return new Promise( async (resolve, reject) => {
      this.logger.log(`Entering processEvent - ${JSON.stringify(params)}`);
      const eventData: EVENT_DATA = {
        event: event,
        viewId: params.view_id?parseInt(params.view_id):null,
        viewStr: params.view_str?params.view_str:null,
        label: params.label,
        index: parseInt(params.index),
        subIndex: params.sub_index?parseInt(params.sub_index):null,
        search: params.search?params.search: "",
        type: params.type?params.type: "",
      };
  
      const targetView = await this.routeRequest(eventData);
      resolve({targetView, appData: this.appData});
    });
  }

  routeRequest = async (eventData: EVENT_DATA): Promise<string> => {
    return new Promise( async (resolve, reject) => {
      let targetView: any;

      this.logger.log(`Entering routeRequest - viewId: ${eventData.viewId}`);
  
      switch (eventData.viewId) {
        case VIEW_ID.VW_INDEX:
        case VIEW_ID.VW_APPHEADER: {
          targetView = this.appHeaderViewManager.processEvent(eventData);
          break;
        }
        case VIEW_ID.VW_TABLE: {
          targetView = this.tableMgr.processEvent(eventData);
          break;
        } 
        case VIEW_ID.VW_SIDENAV: {       
          targetView =  await this.sidenavViewMgr.processEvent(eventData);
          break;
        }    
        default: {
          targetView = "";
        }
      }
      
      resolve(targetView);

    })

    
  }
}
