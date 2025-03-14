import { PerformanceMetrics } from "src/performance-metrics/entities/performance-metrics.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class Users{
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

    @Column()
    role: string

    @OneToMany(() => PerformanceMetrics,
    (performance_metrics) => performance_metrics.user,{
        onDelete: 'CASCADE'
    })

    perfomance_metrics: PerformanceMetrics[]

    @OneToMany(() => Session,
    (session) => session.user,{
        onDelete: 'CASCADE'
    })

    sessions: Session[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}