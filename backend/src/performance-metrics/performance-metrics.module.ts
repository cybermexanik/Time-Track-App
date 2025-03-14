import { Module } from '@nestjs/common';
import { PerformanceMetricsService } from './performance-metrics.service';
import { PerformanceMetricsController } from './performance-metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceMetrics } from './entities/performance-metrics.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PerformanceMetrics])],
  controllers: [PerformanceMetricsController],
  providers: [PerformanceMetricsService],
})
export class PerformanceMetricsModule {}
