import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.OPEN_AI_API_KEY || 'not found';
  }
}
