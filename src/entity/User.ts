import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user", schema: "portafolio" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "descriptions" })
  descriptions: string;

  @Column({ name: "phone" })
  phone: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "github" })
  github: string;

  @Column({ name: "linkedin" })
  linkedin: string;

  @Column({ name: "position" })
  position: string;

  @Column({ name: "cv_url" })
  cvUrl: string;

  @Column({ name: "about_programming" })
  aboutProgramming: string;

  @Column({ name: "about_gaming" })
  aboutGaming: string;

  @Column({ name: "about_series" })
  aboutSeries: string;

  @Column({ name: "password", nullable: true })
  password: string;

  @Column({ name: "user_name", nullable: true })
  userName: string;
}
