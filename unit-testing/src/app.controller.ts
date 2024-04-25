import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('merge')
  mergeArrays(
    @Query('collection1') collection1: string,
    @Query('collection2') collection2: string,
    @Query('collection3') collection3: string,
  ): number[] {
    const parsedCollection1 = JSON.parse(collection1);
    const parsedCollection2 = JSON.parse(collection2);
    const parsedCollection3 = JSON.parse(collection3);
    return this.appService.merge(parsedCollection1, parsedCollection2, parsedCollection3);
  }
}
