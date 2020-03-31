import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST', 'localhost'),
        username: configService.get<string>('MYSQL_USERNAME', 'root'),
        password: configService.get<string>('MYSQL_PASSWORD', ''),
        database: 'memdrill',
        synchronize: true,
        entities: [User],
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
