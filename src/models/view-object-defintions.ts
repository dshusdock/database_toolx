import { VIEW_DATA } from "./constants";

export const enum VIEW_ID {
  VW_INDEX,
  VW_APPHEADER,
  VW_TABLETEST,
  VW_SIDENAV,



}

export const enum HDR_BUTTON_LABEL {
  HOME = "Home",
  QUERY = "Query",
  AUDIT = "Audit",
  LOAD_DB = "Load DB",
  DB_QUERIES = "DB Queries",
  TABLE_MAPPER = "Table Mapper",
  LOGOUT = "Logout"
}

export const enum SIDENAV_BUTTON_LABEL {
  SYSTEM = "System",
  USER = "User",
  RECORDING = "Recording",
  BUTTON = "Button",
  RESOURCE_AOR = "Resource AOR",
  OPEN_CONNECTION = "Open Connection",
  LINE = "Line",
  ZONE = "Zone"
}

export const view_object_definitions: VIEW_DATA[] = [
  //////////////// 1 ////////////////
  {
    id: VIEW_ID.VW_INDEX,
    renderFile: "index",
    viewFlags: [false, false],
    data: [],
    test: "this"

  },
  //////////////// 2 ////////////////
  {
    id: VIEW_ID.VW_APPHEADER,
    renderFile: "partials/app.header",
    viewFlags: [false, false],
    data: [
      { lbl: HDR_BUTTON_LABEL.HOME},
      { lbl: HDR_BUTTON_LABEL.QUERY },
      { lbl: HDR_BUTTON_LABEL.AUDIT },
      { lbl: HDR_BUTTON_LABEL.LOAD_DB },
      { lbl: HDR_BUTTON_LABEL.DB_QUERIES },
      { lbl: HDR_BUTTON_LABEL.TABLE_MAPPER },
      { lbl: HDR_BUTTON_LABEL.LOGOUT }
    ],
    htmx: [
      {url: `/element/event/click/${VIEW_ID.VW_APPHEADER}/`}
    ],
    test: "this"

  },
  //////////////// 3 ////////////////
  {
    id: VIEW_ID.VW_TABLETEST,
    renderFile: "partials/table",
    viewFlags: [false, false],
    data: [ {tableName: "My Table Name"},
      {hdr: ['Zone Cluster', 'VIP Address', 'IP Address', 'Host Name', 'MAC Address', 'HA Role', 'HA State']},
      {row:[
        {row_data: ["val1", "val2", "val3"]}, 
        {row_data: ["val4", "val5", "val6"]},
        {row_data: ["val7", "val8", "val9"]}]
      },],
    query: "select a.parentZoneId as ZoneCluster, a.vIPAddress, c.iPAddress,c.hostName,c.macAddress,d.haRole,d.haState from ServerCluster a, ServerClusterDeviceServerServersMap b, Device c, DeviceServer d where a.id=b.serverClusterId and b.serversId=c.deviceServerId and c.deviceServerId=d.id",
    test: "this"

  },
  {
    id: VIEW_ID.VW_SIDENAV,
    renderFile: "partials/sidenav",
    viewFlags: [false, false],
    data: [
      { lbl: SIDENAV_BUTTON_LABEL.SYSTEM, caret: true},
      { lbl: SIDENAV_BUTTON_LABEL.USER },
      { lbl: SIDENAV_BUTTON_LABEL.RECORDING },
      { lbl: SIDENAV_BUTTON_LABEL.BUTTON },
      { lbl: SIDENAV_BUTTON_LABEL.RESOURCE_AOR },
      { lbl: SIDENAV_BUTTON_LABEL.OPEN_CONNECTION },
      { lbl: SIDENAV_BUTTON_LABEL.LINE },
      { lbl: SIDENAV_BUTTON_LABEL.ZONE }
    ],
    htmx: [
      {url: `/element/event/click/${VIEW_ID.VW_SIDENAV}/`}
    ],
    test: "this"

  },
 
]

// init functions


// helper functions
