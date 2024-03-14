/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-02-25 20:11:52
 * @LastEditors: liufan
 * @LastEditTime: 2024-03-09 18:44:57
 */
import { Injectable } from '@nestjs/common';
import { TranslationsRepository } from './translations.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { Project } from 'src/projects/project.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { GetTranslatesFilterDto } from './dto/get-translate-filter.dto';
import { UpdateTranslateDto } from './dto/update-translation.dto';
import { LanguageEnum } from './translation.constants';
import { Translation } from './translation.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(TranslationsRepository)
    private translationsRepository: TranslationsRepository,
    private projectsService: ProjectsService,
  ) {}

  async createTranslation(createTranslateDto: CreateTranslateDto) {
    const { projectId } = createTranslateDto;

    const project = await this.projectsService.getProjectById(projectId);
    return this.translationsRepository.createTranslate(
      createTranslateDto,
      project,
    );
  }

  async batchCreateTranslation(createTranslateDtoList: CreateTranslateDto[]) {
    for (const createTranslationDto of createTranslateDtoList) {
      await this.createTranslation(createTranslationDto);
    }
  }

  async getTranslate(filterDto: GetTranslatesFilterDto, project: Project) {
    return this.translationsRepository.getTranslates(filterDto, project);
  }

  async getAllTranslations(projectId: string, language: string) {
    return this.translationsRepository.getAllTranslations(projectId, language);
  }

  async getTranslateById(id: string) {
    return this.translationsRepository.findOne({ where: { id } });
  }

  async deleteTranslate(idList: string[]) {
    return this.translationsRepository.deleteTranslationList(idList);
  }

  async deleteMergeTranslatesByKey(projectId: string, key: string) {
    console.log('projectId===>', projectId);

    const project = await this.projectsService.getProjectById(projectId);
    return this.translationsRepository.delete({ project, key });
  }

  async deleteTranslatesByProjectId(projectId: string, language: LanguageEnum) {
    const project = await this.projectsService.getProjectById(projectId);
    return this.translationsRepository.delete({ project, language });
  }

  async updateTranslationById(
    id: string,
    updateTranslationDto: UpdateTranslateDto,
  ) {
    const { language, key, value } = updateTranslationDto;
    const translate = await this.getTranslateById(id);

    if (language) {
      translate.language = language;
    }

    if (key) {
      translate.key = key;
    }

    if (value) {
      translate.value = value;
    }

    await this.translationsRepository.save(translate);

    return translate;
  }

  async getMergeTranslates(
    filterDto: GetTranslatesFilterDto,
    project: Project,
  ) {
    return this.translationsRepository.getMergeTranslates(filterDto, project);
  }

  async batchUpdateTransByKey(
    projectId: string,
    updateTranslationDtos: UpdateTranslateDto[],
  ) {
    const project = await this.projectsService.getProjectById(projectId);

    //   const queryRunner =
    //     this.translationsRepository.manager.connection.createQueryRunner();
    //   await queryRunner.connect();
    //   await queryRunner.startTransaction();

    //   try {
    //     for (const updateTranslationDto of updateTranslationDtos) {
    //       if (!updateTranslationDto.id) {
    //         const createTrans = await queryRunner.manager.create(Translation, {
    //           ...updateTranslationDto,
    //           project,
    //         });
    //         console.log('createTrans=====>', createTrans);
    //       } else {
    //         await queryRunner.manager.save(Translation, {
    //           ...updateTranslationDto,
    //           project,
    //         });
    //       }
    //     }

    //     await queryRunner.commitTransaction();
    //   } catch (error) {
    //     await queryRunner.rollbackTransaction();
    //     throw error;
    //   } finally {
    //     await queryRunner.release();
    //   }
    // }

    for (const updateTranslationDto of updateTranslationDtos) {
      if (!updateTranslationDto.id) {
        const createTrans = this.translationsRepository.create({
          ...updateTranslationDto,
          project,
        });
        await this.translationsRepository.save(createTrans);
      } else {
        await this.translationsRepository.save({
          ...updateTranslationDto,
          project,
        });
      }
    }
  }
}
