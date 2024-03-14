import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsRepository } from './projects.repository';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ProjectsRepository]),
    AuthModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
