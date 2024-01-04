import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppLogger } from '../../utils/logger/app-logger';
import { ViewObj } from './view-obj';
import { view_object_definitions } from 'src/models/view-object-defintions';


type VIEW_STATE = {
  pool: {};
  node: {};
  qemu: {};
}


@Injectable()
export class AppData {
  private logger = new AppLogger(AppData.name)
  view: any[];
  data: any[]

  constructor() {
    this.view = [];
    this.data = [];
  }

  async init() {
    this.logger.log("In initNew...");
    //let data = await this.proxmoxApiSvc.getRequest('/api2/json/cluster/resources');
    // This is where we would reach out to the API server and get some data
    let data = {};

    try {
      view_object_definitions.forEach((el) => {
        let obj = new ViewObj(el);
        obj.init(data);
        this.view.push(obj);
      });
    } catch (err) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      return 1;
    }
    return 0;
  }


}