import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Users } from 'src/user/entities/user.entity'

export class CreatePerformanceMetricDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  productive_time: number

  @IsNotEmpty()
  @IsNumber()
  unproductive_time: number

  @IsNotEmpty()
  @IsNumber()
  idle_time: number

  @IsOptional()
  user?: Users
}
