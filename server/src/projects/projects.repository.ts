import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectFilterDto } from './dto/get-project-filter.dto';
import { paginationResponse } from 'src/common/types';

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {
  private logger = new Logger('ProjectsRepository', { timestamp: true });

  async getProjects(
    filterDto: GetProjectFilterDto,
  ): Promise<paginationResponse<Project[]>> {
    const { projectName, pageNo = 1, pageSize = 10 } = filterDto;
    const query = this.createQueryBuilder('project');

    if (projectName) {
      query.where('(LOWER(project.projectName) LIKE LOWER(:projectName))', {
        projectName: `%${projectName}%`,
      });
    }

    try {
      const projects = await query
        .skip(pageNo - 1)
        .take(pageSize)
        .getMany();
      return {
        data: projects,
        pageNo,
        pageSize,
        total: projects.length,
        success: true,
      };
    } catch (error) {
      this.logger.error(
        'Failed to get projects. Filters: ' + JSON.stringify(filterDto),
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
  async createProjects(createProjectDto: CreateProjectDto): Promise<Project> {
    const { projectName, projectDesc } = createProjectDto;

    const project = this.create({
      projectName,
      projectDesc,
    });
    return this.save(project);
  }

  async getProjectById(projectId: string): Promise<Project> {
    return this.findOne({ projectId });
  }

  async getTranslatesByProjectId(projectId: string): Promise<any> {
    const project = await this.findOne(projectId, {
      relations: ['translations'],
    });

    return project;
  }
}
