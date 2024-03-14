import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectFilterDto } from './dto/get-project-filter.dto';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
  private logger = new Logger('ProjectsController');

  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(@Query() filterDto: GetProjectFilterDto) {
    console.log('filterDto====>', filterDto);
    return this.projectsService.getProjects(filterDto);
  }

  @Post('create')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  updateProject() {
    return 'update project';
  }

  @Delete('/delete/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
