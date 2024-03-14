import { Translation } from 'src/translations/translation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  projectId: string;

  @Column()
  projectName: string;

  @Column()
  projectDesc: string;

  @OneToMany((_type) => Translation, (translation) => translation.project, {
    eager: true,
  })
  translations: Translation[];
}
