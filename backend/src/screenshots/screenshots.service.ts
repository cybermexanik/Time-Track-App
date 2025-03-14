import { Injectable } from '@nestjs/common';
import { CreateScreenshotDto } from './dto/create-screenshot.dto';
import { UpdateScreenshotDto } from './dto/update-screenshot.dto';

@Injectable()
export class ScreenshotsService {
  create(createScreenshotDto: CreateScreenshotDto) {
    return 'This action adds a new screenshot';
  }

  findAll() {
    return `This action returns all screenshots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} screenshot`;
  }

  update(id: number, updateScreenshotDto: UpdateScreenshotDto) {
    return `This action updates a #${id} screenshot`;
  }

  remove(id: number) {
    return `This action removes a #${id} screenshot`;
  }
}
