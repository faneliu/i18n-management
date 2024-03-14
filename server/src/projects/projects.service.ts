import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsRepository } from './projects.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectFilterDto } from './dto/get-project-filter.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
  ) {}
  async getProjects(filterDto: GetProjectFilterDto) {
    return await this.projectsRepository.getProjects(filterDto);
  }

  createProject(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.createProjects(createProjectDto);
  }

  getProjectById(projectId: string) {
    return this.projectsRepository.getProjectById(projectId);
  }

  updateProject() {
    return 'update project';
  }

  async deleteProject(projectId: string) {
    const result = await this.projectsRepository.delete({ projectId });
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }
  }
}
