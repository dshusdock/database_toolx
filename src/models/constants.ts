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

}

export interface APP_DATA {

}

export interface VIEW_DATA {
  id: number;
  renderFile: string;
  viewFlags: any[]
  data?: any[];
  htmx?: any[];
  style?: any[];
  class?: any[];
  initData?: (data: any) => any;
  test?: string
}

export type REQUEST_DATA = {
  event: APP_EVENTS,
  id: number,
  type: string,
  index?: number
}
