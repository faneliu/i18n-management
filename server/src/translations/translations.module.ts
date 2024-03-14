import { Module } from '@nestjs/common';
import { TranslationsController } from './translations.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { TranslationsService } from './translations.service';
import { TranslationsRepository } from './translations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectsService } from 'src/projects/projects.service';
import { ProjectsRepository } from 'src/projects/projects.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TranslationsRepository, ProjectsRepository]),
  ],
  controllers: [TranslationsController],
  providers: [TranslationsService, ProjectsService],
})
export class TranslationsModule {}
