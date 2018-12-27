import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Task } from '../task/task.entity'
import { Type } from '../type/type.entity'

@Entity()
export class Docs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;
    
    @Column("varchar")
    pathName: string;

    @OneToMany(type => Task, task => task.docs)
    tasks: Task[];

    @ManyToOne(type => Type, type => type.docses)
    type: Type;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}