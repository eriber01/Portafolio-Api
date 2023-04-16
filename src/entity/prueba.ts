import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "prueba", schema: "portafolio" })
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", default: 'hola mundo', })
  name: string;

  @Column({ name: "enabled", default: false, })
  enabled: boolean;
}
