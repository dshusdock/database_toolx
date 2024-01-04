import { Injectable } from "@nestjs/common";
import { AppData } from "src/models/app-data/app-data";
import { APP_STATE, SUCCESS } from "src/models/constants";
import { AppLogger } from "src/utils/logger/app-logger";

@Injectable()
export class MainService {
    private logger = new AppLogger(MainService.name)
    appState: APP_STATE;

  constructor(private appData: AppData) {
  }

  async init() {
    this.appState = APP_STATE.INIT;
    if (await this.appData.init() === SUCCESS) {
        this.logger.log("App Init...");
    }

  }

  async getInitialState(): Promise<AppData> {
    await this.appData.init();

    return this.appData;
  }

  getAppData() {
    return this.appData;
  }
}
