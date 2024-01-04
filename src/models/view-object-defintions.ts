import { VIEW_DATA } from "./constants";

export const enum VIEW_ID {
  VW_INDEX,
  VW_APPHEADER,



}

export const view_object_definitions: VIEW_DATA[] = [
  {
    id: VIEW_ID.VW_INDEX,
    renderFile: "index",
    viewFlags: [false, false],
    data: [],
    test: "this"

  },
  {
    id: VIEW_ID.VW_APPHEADER,
    renderFile: "partials/app.header",
    viewFlags: [false, false],
    data: [
      { lbl: "Home"},
      { lbl: "Query" },
      { lbl: "Audit" },
      { lbl: "Load DB" },
      { lbl: "DB Queries" },
      { lbl: "Table Mapper" },
      { lbl: "Logout" }
    ],
    test: "this"

  },
 
]

// init functions


// helper functions
