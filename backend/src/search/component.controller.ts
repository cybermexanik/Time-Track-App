import { Controller, Get, Query } from '@nestjs/common';
import { ComponentService } from './component.service';

@Controller('components')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.componentService.search(query);
  }
}