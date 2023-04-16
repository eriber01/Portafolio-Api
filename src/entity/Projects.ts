import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
// import { ProjectsTechnologies } from "./ProjectsTecnologies";

@Entity({ name: "projects", schema: "portafolio" })
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "descriptions" })
  descriptions: string;

  @Column({ name: "url" })
  url: string;

  @Column({ name: "img" })
  img: string;

  @Column({ name: "git_url" })
  gitUrl: string;

  @Column({ name: "public_id" })
  publicId?: string;

  @Column({ name: "enabled", default: true })
  enabled: boolean;

  // @OneToMany(() => ProjectsTecnologies, (t) => t.projectId)
  // tech: ProjectsTecnologies;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
