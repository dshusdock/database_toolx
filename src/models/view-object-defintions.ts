import { VIEW_DATA } from "./constants";
import { HDR_BUTTON_LABEL, SIDENAV_BUTTON_LABEL, SYSTEM_SUB_BUTTON_LABEL, USER_SUB_BUTTON_LABEL } from "./button-data";

export const enum VIEW_ID {
  VW_INDEX,
  VW_APPHEADER,
  VW_TABLETEST,
  VW_SIDENAV,



}

export const view_object_definitions: VIEW_DATA[] = [
  //////////////// 0 ////////////////
  {
    id: VIEW_ID.VW_INDEX,
    renderFile: "index",
    viewFlags: [false, false],
    data: [],
    test: "this"

  },
  //////////////// 1 ////////////////
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
  //////////////// 2 ////////////////
  {
    id: VIEW_ID.VW_TABLETEST,
    renderFile: "partials/table",
    viewFlags: [false, false],
    data: [ {tableName: SYSTEM_SUB_BUTTON_LABEL.ZONE_INFO},
      {hdr: ['Zone Cluster', 'VIP Address', 'IP Address', 'Host Name', 'MAC Address', 'HA Role', 'HA State']},
      {row:[]
      },],
    query: "select a.parentZoneId as ZoneCluster, a.vIPAddress, c.iPAddress,c.hostName,c.macAddress,d.haRole,d.haState from ServerCluster a, ServerClusterDeviceServerServersMap b, Device c, DeviceServer d where a.id=b.serverClusterId and b.serversId=c.deviceServerId and c.deviceServerId=d.id",
    test: "this"

  },
  //////////////// 3 ////////////////
  {
    id: VIEW_ID.VW_SIDENAV,
    renderFile: "partials/sidenav",
    altRenderFile: "partials/table",
    viewFlags: [false, false],
    data: [
      { 
        lbl: SIDENAV_BUTTON_LABEL.SYSTEM, 
        caret: false,
        class: "bi-caret-right",
        subLbl: [
          {lbl: SYSTEM_SUB_BUTTON_LABEL.ENTERPISE_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.ZONE_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.CCM_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.MEDIA_MGR_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.MEDIA_GWY_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.DEVICE_ZONE_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.IQMAX_TURRET_INVENTORY},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.TURRET_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.JOB_DETAILS_INFO},
          {lbl: SYSTEM_SUB_BUTTON_LABEL.CDI_COUNTS},
        ]
      },
      { 
        lbl: SIDENAV_BUTTON_LABEL.USER,
        caret: false,
        class: "bi-caret-right",
        subLbl: [
          {lbl: USER_SUB_BUTTON_LABEL.USER_INFO},
          {lbl: USER_SUB_BUTTON_LABEL.COMMUNICATION_HISTORY},
          {lbl: USER_SUB_BUTTON_LABEL.JOB_EXECUTION_EVENT},
          {lbl: USER_SUB_BUTTON_LABEL.JOB_SUMMARY},
          {lbl: USER_SUB_BUTTON_LABEL.PERSONAL_EXTENSION},
          {lbl: USER_SUB_BUTTON_LABEL.PERSONALDIRNAMES_INFO},
          {lbl: USER_SUB_BUTTON_LABEL.USERCDIWITHNOUSERID_INFO},] 
      },
      { lbl: SIDENAV_BUTTON_LABEL.RECORDING,
        caret: false,
        class: "bi-caret-right",
        subLbl: [
          {lbl: USER_SUB_BUTTON_LABEL.USER_INFO},
          {lbl: USER_SUB_BUTTON_LABEL.COMMUNICATION_HISTORY},
          {lbl: USER_SUB_BUTTON_LABEL.JOB_EXECUTION_EVENT},
          {lbl: USER_SUB_BUTTON_LABEL.JOB_SUMMARY},
          {lbl: USER_SUB_BUTTON_LABEL.PERSONAL_EXTENSION},
          {lbl: USER_SUB_BUTTON_LABEL.PERSONALDIRNAMES_INFO},
          {lbl: USER_SUB_BUTTON_LABEL.USERCDIWITHNOUSERID_INFO},] },
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
