import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  dataMapper() {
    return this.appService.dataMapper();
  }
}
