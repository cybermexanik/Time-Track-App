import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScreenshotsService } from './screenshots.service';
import { CreateScreenshotDto } from './dto/create-screenshot.dto';
import { UpdateScreenshotDto } from './dto/update-screenshot.dto';

@Controller('screenshots')
export class ScreenshotsController {
  constructor(private readonly screenshotsService: ScreenshotsService) {}

  @Post()
  create(@Body() createScreenshotDto: CreateScreenshotDto) {
    return this.screenshotsService.create(createScreenshotDto);
  }

  @Get()
  findAll() {
    return this.screenshotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenshotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenshotDto: UpdateScreenshotDto) {
    return this.screenshotsService.update(+id, updateScreenshotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenshotsService.remove(+id);
  }
}
