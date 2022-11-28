import { Controller, Get, HttpCode, Header, Res } from "@nestjs/common";
import { AppService } from './app.service';
import {Response} from "express";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(222)
  @Header("Sex", '123')
  @Get('test/:id')
  async getHello2(@Res() res:Response)  {
    return res.sendStatus(420);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
