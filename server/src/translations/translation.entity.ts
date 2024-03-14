import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageEnum } from './translation.constants';
import { Project } from 'src/projects/project.entity';

@Entity('translation')
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  language: LanguageEnum;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne((_type) => Project, (project) => project.translations, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  project: Project;
}
