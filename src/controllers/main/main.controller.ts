import { Controller, Get, Param, Render, Res } from "@nestjs/common";
import { MainService } from "./main.service";
import { Response } from 'express';
import { AppLogger } from "src/utils/logger/app-logger";
import { APP_EVENTS } from "src/models/constants";


@Controller("")
export class MainController {
  private readonly logger = new AppLogger(MainController.name);

  constructor(private readonly mainSvc: MainService) {}

  @Get("/")
  @Render("index")
  async getIndex() {
    const appData = await this.mainSvc.getInitialState();
    return {
      appData,
    };
  }

  @Get("/appstate")
  getCurrentState() {
    const data = this.mainSvc.getAppData();
    console.log("APPDATA:" + JSON.stringify(data));
    return data;
  }

  @Get("/element/event/click/:id/:type")
  // @Render('partials/dc-details')
  handleElementClickEvent(@Param() params: any, @Res() res: Response) {
    this.logger.log(
      `Path: [/element/event/click/] id = ${params.id} type = ${params.type}`,
    );

    const { target, appData } = this.mainSvc.processEvent(
      APP_EVENTS.EV_CLICK,
      params,
    );

    return res.render(target, { appData });
  }

  @Get('/element/event/click/:id/:index')
  // @Render('partials/dc-details')
  handleElementClickEventMulti(@Param() params: any, @Res() res: Response) {

    this.logger.log(`Path: [/element/event/click/] id = ${params.id} type = ${params.type} index = ${params.index}`);

    const { target, appData } = this.mainSvc.processEvent(APP_EVENTS.EV_CLICK, params);

    return res.render(target, { appData });
  }
}
