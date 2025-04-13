import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  route: string; 

  @Column({ nullable: true })
  description: string;

  @Column("text", { array: true, nullable: true })
  tags: string[];
}