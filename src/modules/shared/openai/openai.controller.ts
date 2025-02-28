import { Controller, Get, Query } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('find-brand')
  findBrand(@Query('query') query: string) {
    return this.openAiService.findBrandInSearchQuery(query);
  }
}
