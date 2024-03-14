import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { PushTranslationListDto } from './dto/push-translation-list.dto';
import { UpdateTranslateDto } from './dto/update-translation.dto';

@Controller('translations')
export class TranslationsController {
  constructor(
    private translationsService: TranslationsService,
    private projectsService: ProjectsService,
  ) {}

  @Post()
  createTranslation(@Body() createTranslationDto: CreateTranslateDto) {
    return this.translationsService.createTranslation(createTranslationDto);
  }

  @Post('batch-create')
  batchCreateTranslation(
    @Body() createTranslationDtoList: CreateTranslateDto[],
  ) {
    this.translationsService.batchCreateTranslation(createTranslationDtoList);
  }

  @Get('/allByProjectId')
  async getAllTranslationsByProjectId(
    @Query('projectId') projectId,
    @Query('language') language,
  ) {
    return this.translationsService.getAllTranslations(projectId, language);
  }

  @Get('/page')
  async getTranslationsByProjectIdAndPagation(@Query() query) {
    const { projectId, pageNo, pageSize, language, id, key } = query || {};
    const project = await this.projectsService.getProjectById(projectId);
    return this.translationsService.getTranslate(
      {
        pageNo,
        pageSize,
        language,
        id,
        key,
      },
      project,
    );
  }

  // 不会覆盖存在的数据
  @Post('pushAllByProjectId')
  async pushTranslationsByProjectId(
    @Body() pushTranslationListDto: PushTranslationListDto,
  ) {
    const { projectId, language, translationList } = pushTranslationListDto;
    const transList = translationList;
    const project = await this.projectsService.getProjectById(projectId);
    transList.forEach(async (translation) => {
      const trans = await this.translationsService.getTranslate(
        { projectId: project.projectId, language, key: translation.key },
        project,
      );
      console.log('trans===>', trans);

      if (!trans.total) {
        console.log('create new translate===>', translation);
        this.translationsService.createTranslation({
          projectId,
          language,
          key: translation.key,
          value: translation.value,
        });
      }
    });

    return { success: true };
  }
  // 会覆盖存在的数据
  @Post('updateAllByProjectId')
  async updateTranslationsByProjectId(
    @Body() pushTranslationListDto: PushTranslationListDto,
  ) {
    const { projectId, language, translationList } = pushTranslationListDto;
    await this.translationsService.deleteTranslatesByProjectId(
      projectId,
      language,
    );
    const transList = translationList;
    transList.forEach(async (translation) => {
      await this.translationsService.createTranslation({
        projectId,
        key: translation.key,
        value: translation.value,
        language,
      });
    });

    return { success: true };
  }

  @Post('/delete')
  async deleteTranslation(@Body('idList') idList: string[]) {
    console.log('idList====>', idList);

    return this.translationsService.deleteTranslate(idList);
  }

  @Post('/deleteByKey')
  async deleteMergeTranslatesByKey(
    @Body('projectId') projectId: string,
    @Body('key') key: string,
  ) {
    return this.translationsService.deleteMergeTranslatesByKey(projectId, key);
  }

  @Post('/update/:id')
  async updateTranslation(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslateDto,
  ) {
    return this.translationsService.updateTranslationById(
      id,
      updateTranslationDto,
    );
  }

  @Post('/batch-update/:projectId')
  async batchUpdateTransByKey(
    @Param('projectId') projectId,
    @Body('transList') updateTranslationDto: UpdateTranslateDto[],
  ) {
    return this.translationsService.batchUpdateTransByKey(
      projectId,
      updateTranslationDto,
    );
  }

  @Get('/merge/page')
  async getMergeTranslationsByProjectIdAndPagation(@Query() query) {
    const { projectId, pageNo, pageSize, key } = query || {};
    const project = await this.projectsService.getProjectById(projectId);
    return this.translationsService.getMergeTranslates(
      {
        pageNo,
        pageSize,
        key,
      },
      project,
    );
  }
}
