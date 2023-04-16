import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
// import { Projects } from "./Projects";
// import { ProjectsTechnologies } from "./ProjectsTecnologies";

@Entity({ name: "technologies", schema: "portafolio" })
export class Technologies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "url" })
  url: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "enabled", default: true })
  enabled: boolean;

  @Column({ name: "descriptions" })
  descriptions?: string;

  @Column({ name: "public_id" })
  publicId?: string;

  // @OneToMany(() => ProjectsTecnologies, (p) => p.tech)
  // techProjects: ProjectsTecnologies[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
