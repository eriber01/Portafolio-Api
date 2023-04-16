import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "experiences", schema: "portafolio" })
export class Experiences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company" })
  company: string;

  @Column({ name: "descriptions" })
  descriptions: string;

  @Column({ name: "start" })
  start: Date;

  @Column({ name: "end", nullable: true })
  end: Date;

  @Column({ name: "enabled", default: true })
  enabled: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
