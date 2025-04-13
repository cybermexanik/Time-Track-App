import { Users } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('performance_metrics')
export class PerformanceMetrics {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  productive_time: number

  @Column()
  unproductive_time: number

  @Column()
  idle_time: number

  @ManyToOne(() => Users, (user) => user.performance_metrics)
  @JoinColumn({ name: 'user_id' })
  user: Users

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
