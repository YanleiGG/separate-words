import {Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";
import { Role } from '../role/role.entity'
import { Task } from '../task/task.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => Role, role => role.users)
    roles: Role[];

    @ManyToMany(type => Task, task => task.users)
    tasks: Task[];
}