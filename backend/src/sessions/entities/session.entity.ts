import { Users } from 'src/user/entities/user.entity'
import { Website } from 'src/websites/entities/website.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp' })
  start_time: Date

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date

  @Column({ type: 'interval', nullable: true })
  total_duration: number

  @ManyToOne(() => Users, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  user: Users

  @OneToMany(() => Website, (website) => website.session, {
    cascade: true,
  })
  websites: Website[]
}
