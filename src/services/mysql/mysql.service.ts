import { Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { AppLogger } from "src/utils/logger/app-logger";


@Injectable()
export class MysqlService {
  private logger = new AppLogger(MysqlService.name);
  private connection: any = null;;

  constructor() {}

  async createConnection() {
    this.connection = await mysql.createConnection({
      host: "10.205.183.11",
      user: "dunkin",
      password: "dunkin123",
      database : 'Citi1006'
    });
  }

  async simpleQuery() {

    if (!this.connection) {
      await this.createConnection();
    }
    
    const [rows, fields] = await this.connection.execute('select a.parentZoneId as ZoneCluster, a.vIPAddress, c.iPAddress,c.hostName,c.macAddress,d.haRole,d.haState from ServerCluster a, ServerClusterDeviceServerServersMap b, Device c, DeviceServer d where a.id=b.serverClusterId and b.serversId=c.deviceServerId and c.deviceServerId=d.id');
    return rows;
  }

  async query(queryStr: string) {

    if (!this.connection) {
      await this.createConnection();
    }
    
    const [rows, fields] = await this.connection.execute(queryStr);
    this.logger.log("Got row:"  + JSON.stringify(rows[0]))
    
    return rows;
  }

  


}
