import { Controller, Get, Render } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('')
export class MainController {

  constructor(private readonly mainSvc: MainService) { }

  @Get('/')
  @Render('index')
  async getIndex() {
    const appData = await this.mainSvc.getInitialState();
    return {
      appData
    };
  }

  @Get('/appstate')
  getCurrentState() {
    const data = this.mainSvc.getAppData();
    console.log("APPDATA:" + JSON.stringify(data));
    return data;
  }
}
