import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PerformanceMetricsModule } from './performance-metrics/performance-metrics.module'
import { ScreenshotsModule } from './screenshots/screenshots.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionsModule } from './sessions/sessions.module'
import { UserModule } from './user/user.module'
import { Users } from './user/entities/user.entity'
import { PerformanceMetrics } from './performance-metrics/entities/performance-metrics.entity'
import { Auth } from './auth/entities/auth.entity'
import { Session } from './sessions/entities/session.entity'
import { WebsitesModule } from './websites/websites.module'
import { Website } from './websites/entities/website.entity'

@Module({
  imports: [
    PerformanceMetricsModule,
    ScreenshotsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false,
        entities: [Users, PerformanceMetrics, Auth, Session, Website],
      }),
      inject: [ConfigService],
    }),
    SessionsModule,
    UserModule,
    WebsitesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
