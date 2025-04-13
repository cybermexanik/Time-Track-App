import { Users } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role_name: string

  @OneToMany(
    () => Users,
    (users) => users.role,
    {
      onDelete: 'CASCADE',
    },
  )
  users: Users[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
