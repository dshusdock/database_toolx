import { Controller, Get, Param, Query, Render, Res } from "@nestjs/common";
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
  handleElementClickEvent(@Param() params: any, @Res() res: Response) {
    this.logger.log(
      `Path: 1[/element/event/click/] id = ${params.id} type = ${params.type}`,
    );

    const { targetView, appData } = this.mainSvc.processEvent(
      APP_EVENTS.EV_CLICK,
      params,
    );

    return res.render(targetView, { appData });
  }

  @Get('/element/event/click/:id/:index')
  handleElementClickEventMulti(@Param() params: any, @Res() res: Response) {

    this.logger.log(`Path: 2[/element/event/click/] id = ${params.id} type = ${params.type} index = ${params.index}`);

    const { targetView, appData } = this.mainSvc.processEvent(APP_EVENTS.EV_CLICK, params);

    return res.render(targetView, { appData });
  }

  @Get('/element/event/click/:id/:index/:subindex')
  handleElementClickEventMultiX(@Param() params: any, @Res() res: Response) {

    this.logger.log(`Path: 3[/element/event/click/] id = ${params.id} type = ${params.type} index = ${params.index}`);

    const { targetView, appData } = this.mainSvc.processEvent(APP_EVENTS.EV_CLICK, params);

    return res.render(targetView, { appData });
  }


  ///////////////with Query//////////////////
  @Get('/element/event/click/')
  handleElementClickEventQuery(@Query() params: any, @Res() res: Response) {

    this.logger.log(`Path: 4[/element/event/click/] params = ${JSON.stringify(params)} `);

    const { targetView, appData } = this.mainSvc.processEvent(APP_EVENTS.EV_CLICK, params);
    console.log("Render - " + targetView);
    return res.render(targetView, { appData });
  }
}
