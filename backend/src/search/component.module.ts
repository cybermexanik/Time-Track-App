import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Component } from './entities/component.entity'
import { ComponentController } from './component.controller'
import { ComponentService } from './component.service'

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
