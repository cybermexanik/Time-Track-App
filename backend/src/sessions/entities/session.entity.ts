import { Users } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_time: Date

    @Column()
    end_time: Date

    @Column()
    total_duration: number

    @ManyToOne(() => Users, (user) => user.sessions, {
        onDelete: 'CASCADE'
    })
    user: Users;
}
