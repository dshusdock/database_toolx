import { VIEW_DATA } from '../constants';

export class ViewObj implements VIEW_DATA {
  id: number;
  renderFile: string;
  altRenderFile?: string;
  viewFlags: boolean[]
  data?: any[];
  htmx?: any[]
  style?: any[];
  class?: any[];
  test?: string;
  initData?: (data: any) => any;

  constructor(obj: VIEW_DATA) {
    this.id = obj.id;
    this.renderFile = obj.renderFile;
    this.viewFlags = [...obj.viewFlags];
    this.test = `testing id: ${this.id}`;
    
    if (obj.data) { this.data = [...obj.data] }
    if (obj.htmx) { this.htmx = [...obj.htmx] }
    if (obj.style) { this.style = [...obj.style] }
    if (obj.class) { this.class = [...obj.class] }
    if (obj.initData) {this.initData = obj.initData}    
    if (obj.altRenderFile) { this.altRenderFile = obj.altRenderFile}
  }

  async init(data) {
    if (this.initData) {
      let retVal = await this.initData(data);
      if (retVal !== null) {
        this.data = [...retVal];
      }
    } 
  }
}