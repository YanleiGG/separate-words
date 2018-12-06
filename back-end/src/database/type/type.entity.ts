import {OneToMany, Entity, Column, PrimaryGeneratedColumn, ManyToMany, Index, CreateDateColumn, UpdateDateColumn, JoinTable} from "typeorm";
import { Task } from '../task/task.entity'

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @ManyToMany(type => Task, task => task.types)
    tasks: Task[];
}