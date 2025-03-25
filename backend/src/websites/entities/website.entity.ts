import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Session } from '../../sessions/entities/session.entity'

@Entity('websites')
export class Website {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @Column({ type: 'timestamp' })
  visit_time: Date

  @Column({ type: 'interval' })
  duration: number

  @ManyToOne(() => Session, (session) => session.websites, {
    onDelete: 'CASCADE',
  })
  session: Session
}
