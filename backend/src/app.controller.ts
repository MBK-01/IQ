import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health(@Res() res: any) {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }
}
