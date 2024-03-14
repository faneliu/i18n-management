import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Translation } from './translation.entity';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { Project } from 'src/projects/project.entity';
import { GetTranslatesFilterDto } from './dto/get-translate-filter.dto';
import { paginationResponse } from 'src/common/types';

@EntityRepository(Translation)
export class TranslationsRepository extends Repository<Translation> {
  private logger = new Logger('TranslationsRepository', { timestamp: true });

  async createTranslate(
    createTranslateDto: CreateTranslateDto,
    project: Project,
  ) {
    const { language, key, value } = createTranslateDto;
    const translate = this.create({
      language,
      key,
      value,
      project,
    });
    await this.save(translate);
    return translate;
  }

  async getTranslateByKey(key: string) {
    return this.findOne({ where: { key } });
  }

  getAllTranslations(projectId: string, language: string) {
    const where: any = {
      project: {
        projectId,
      },
    };

    if (language) {
      where.language = language;
    }

    return this.find({
      where,
      order: {
        key: 'ASC',
      },
    });
  }

  deleteTranslationList(idList) {
    const query = this.createQueryBuilder('translate');

    return query.delete().where('id IN (:...idList)', { idList }).execute();
  }

  async getTranslates(
    filterDto: GetTranslatesFilterDto,
    project: Project,
  ): Promise<paginationResponse<Translation[]>> {
    const { language, key, pageNo = 1, pageSize = 10, id } = filterDto;

    const query = this.createQueryBuilder('translate');

    console.log('language===>', language);

    query.where({ project });
    if (language) {
      query.andWhere('translate.language = :language', { language });
    }

    if (key) {
      query.andWhere('(LOWER(translate.key) LIKE LOWER(:key))', {
        key: `%${key}%`,
      });
    }
    if (id) {
      query.andWhere('translate.id = :id', { id });
    }

    const total = await query.getCount();

    try {
      const translates = await query
        .orderBy('translate.key', 'ASC')
        .skip(pageNo - 1)
        .take(pageSize)
        .getMany();
      return {
        data: translates,
        pageNo,
        pageSize,
        total,
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `Failed to get translates. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getMergeTranslates(
    filterDto: GetTranslatesFilterDto,
    project: Project,
  ): Promise<paginationResponse<Translation[]>> {
    const { key, pageNo = 1, pageSize = 10 } = filterDto;

    const query = this.createQueryBuilder('translate');

    query.where({ project });
    // if (language) {
    //   query.andWhere('translate.language = :language', { language });
    // }

    console.log('key================>', key);

    if (key) {
      query.andWhere('(LOWER(translate.key) LIKE LOWER(:key))', {
        key: `%${key}%`,
      });
    }
    // if (id) {
    //   query.andWhere('translate.id = :id', { id });
    // }

    try {
      const count = await query
        .select('COUNT(DISTINCT translate.key)', 'count')
        .getRawOne();

      console.log('count====>', count);
      const translates = await query
        .select('translate.key')
        .addSelect(
          "json_object_agg(translate.language, json_build_object('id', translate.id, 'value', translate.value))",
          'values',
        )
        .groupBy('translate.key')
        .orderBy('translate.key', 'ASC')
        .skip((pageNo - 1) * pageSize)
        .take(pageSize)
        .getRawMany();

      if (key) {
        query.andWhere('translate.key LIKE :key', { key: `%${key}%` }); // 存在 key 时添加模糊筛选条件
      }
      return {
        data: translates,
        pageNo,
        pageSize,
        total: count.count,
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `Failed to get translates. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
