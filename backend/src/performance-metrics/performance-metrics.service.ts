import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto'
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto'
import { Repository } from 'typeorm'
import { PerformanceMetrics } from './entities/performance-metrics.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PerformanceMetricsService {
  constructor(
    @InjectRepository(PerformanceMetrics)
    private readonly perfomanceMetricsRepository: Repository<PerformanceMetrics>,
  ) {}

  async create(
    createPerformanceMetricDto: CreatePerformanceMetricDto,
    id: number,
  ) {
    const currentPerfomanceMetric =
      await this.perfomanceMetricsRepository.findBy({
        user: { id },
        title: createPerformanceMetricDto.title,
        productive_time: createPerformanceMetricDto.productive_time,
        unproductive_time: createPerformanceMetricDto.unproductive_time,
        idle_time: createPerformanceMetricDto.idle_time,
      })

    if (currentPerfomanceMetric.length)
      throw new BadRequestException('Метрики уже существуют')

    const newPerfomanceMetric = {
      title: createPerformanceMetricDto.title,
      productive_time: createPerformanceMetricDto.productive_time,
      unproductive_time: createPerformanceMetricDto.unproductive_time,
      idle_time: createPerformanceMetricDto.idle_time,
      user: {
        id,
      },
    }

    return await this.perfomanceMetricsRepository.save(newPerfomanceMetric)
  }

  async findAll(id: number) {
    return await this.perfomanceMetricsRepository.find({
      where: {
        user: { id },
      },
    })
  }

  async findOne(id: number) {
    const currentMetric = await this.perfomanceMetricsRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    })

    if (!currentMetric) throw new NotFoundException('Метрик не найден')
    return currentMetric
  }

  async update(
    id: number,
    updatePerformanceMetricDto: UpdatePerformanceMetricDto,
  ) {
    const metric = await this.perfomanceMetricsRepository.findOne({
      where: { id },
    })

    if (!metric) throw new NotFoundException('Метрик не найден')
    return await this.perfomanceMetricsRepository.update(
      id,
      updatePerformanceMetricDto,
    )
  }

  async remove(id: number) {
    const metric = await this.perfomanceMetricsRepository.findOne({
      where: {
        id,
      },
    })
    if (!metric) throw new NotFoundException('Метрик не найден')

    return await this.perfomanceMetricsRepository.delete(id)
  }
}
