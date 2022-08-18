import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/status')
  async status() {
    return 'ok';
  }
}
