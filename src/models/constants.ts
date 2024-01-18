import { BUTTON_SUB_BUTTON_LABEL, RECORDING_SUB_BUTTON_LABEL, SYSTEM_SUB_BUTTON_LABEL, USER_SUB_BUTTON_LABEL } from "./button-data";

export const SUCCESS = 0;
export const ERROR = 1;

export const API_ENDPPOINT = {
  VERSION: 'version',
  NODES: 'nodes',
  CLUSTER_STATUS: 'cluster/status',
  CLUSTER_LOG: 'cluster/log'
};

export type NODE = {
  node: string;
  status: string;
  type: string;
  name: string;
}

export interface RENDER_DATA  {
  targetView: string;
  appData: APP_DATA;
}

export const enum VIEW_TYPE {
  SERVER_VIEW = "Server View",
  POOL_VIEW = "Pool View",
  FOLDER_VIEW = "Folder View"
}

export const enum CARET_TYPE {
  DATACENTER,
  SERVERVW_NODE,
  POOLVW_NODE,
  FOLDERVW_NODE,
  FOLDERVW_POOL,
  FOLDERVW_VM,
  FOLDERVW_STORAGE
}

export const enum APP_STATE {
  INIT,
}

export const enum APP_EVENTS {
  EV_CLICK,
  INPUT_CHANGED

}

export interface APP_DATA {

}

export interface VIEW_DATA {
  id: number;
  renderFile: string;
  altRenderFile?: string;
  viewFlags: any[]
  data?: any[];
  htmx?: any[];
  style?: any[];
  class?: any[];
  initData?: (data: any) => any;
  test?: string
  query?: string;
}

export type EVENT_DATA = {
  event: APP_EVENTS,
  viewId?: number,
  viewStr?: string,
  label?: string,
  index?: number,
  subIndex?: number,
  search?: string,
  type?: string
}

export const UNIGY_SQL_STRINGS = [
  "select a.parentZoneId as ZoneCluster, a.vIPAddress, c.iPAddress,c.hostName,c.macAddress,d.haRole,d.haState from ServerCluster a, ServerClusterDeviceServerServersMap b, Device c, DeviceServer d where a.id=b.serverClusterId and b.serversId=c.deviceServerId and c.deviceServerId=d.id')",
  ""
]

export type BTN_SQL_QUERIES_MAP_DEF = {
  type: SYSTEM_SUB_BUTTON_LABEL | USER_SUB_BUTTON_LABEL | RECORDING_SUB_BUTTON_LABEL |
  BUTTON_SUB_BUTTON_LABEL ,
  sqlStr: string,
  header: string[],
  sortable?: boolean
}
