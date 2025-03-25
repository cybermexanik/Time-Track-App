import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PerformanceMetricsService } from './performance-metrics.service'
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto'
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('performance-metrics')
export class PerformanceMetricsController {
  constructor(
    private readonly performanceMetricsService: PerformanceMetricsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createPerformanceMetricDto: CreatePerformanceMetricDto,
    @Req() req,
  ) {
    return this.performanceMetricsService.create(
      createPerformanceMetricDto,
      +req.user.id,
    )
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return this.performanceMetricsService.findAll(+req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.performanceMetricsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePerformanceMetricDto: UpdatePerformanceMetricDto,
  ) {
    return this.performanceMetricsService.update(
      +id,
      updatePerformanceMetricDto,
    )
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.performanceMetricsService.remove(+id)
  }
}
