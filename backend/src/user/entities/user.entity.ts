import { PerformanceMetrics } from 'src/performance-metrics/entities/performance-metrics.entity'
import { Session } from 'src/sessions/entities/session.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from '/Users/jesuspiece/Time-Track-App/backend/src/roles/entities/role.entity'

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  surname: string

  @Column()
  name: string

  @Column()
  middlename: string

  @Column({ nullable: true })
  avatar_url?: string

  @Column({ nullable: true })
  status?: string

  @ManyToOne(
    () => Role,
    (role) => role.users,
    {
      onDelete: 'CASCADE',
    },
  )
  role: Role

  @OneToMany(
    () => PerformanceMetrics,
    (performance_metrics) => performance_metrics.user,
    {
      onDelete:'CASCADE',
    },
  )
  performance_metrics: PerformanceMetrics[]

  @OneToMany(() => Session, (session) => session.user, {
    onDelete: 'CASCADE',
  })
  sessions: Session[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
