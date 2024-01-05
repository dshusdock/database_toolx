import { VIEW_DATA } from "./constants";

export const enum VIEW_ID {
  VW_INDEX,
  VW_APPHEADER,
  VW_TABLETEST,



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
  {
    id: VIEW_ID.VW_TABLETEST,
    renderFile: "partials/table",
    viewFlags: [false, false],
    data: [ {tableName: "My Table Name"},
      {hdr: ['hdr1', 'hdr2', 'hdr3']},
      {row:[
        {row_data: ["val1", "val2", "val3"]}, 
        {row_data: ["val4", "val5", "val6"]},
        {row_data: ["val7", "val8", "val9"]}]
      },],

        
    test: "this"

  }
 
]

// init functions


// helper functions
