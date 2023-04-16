import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Projects } from "./Projects";
import { Technologies } from "./Technologies";

@Entity({ name: "project_techs", schema: "portafolio" })
export class ProjectsTechnologies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "project_id" })
  projectId: number;

  @Column({ name: "tech_id" })
  techId: number;

  // @ManyToOne(() => Technologies, (tech) => tech.techProjects)
  // tech: Technologies;

  // @ManyToOne(() => Projects, (project) => project.tech)
  // project: Projects;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
