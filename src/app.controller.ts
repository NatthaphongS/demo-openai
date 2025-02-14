import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getCheck(): string {
    return 'Project was running';
  }
}
