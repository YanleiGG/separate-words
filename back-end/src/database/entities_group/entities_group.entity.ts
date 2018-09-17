import {Entity, ManyToMany, JoinTable, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Entities } from '../entities/entities.entity'
import { Task } from '../task/task.entity'

@Entity()
export class EntitiesGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Task, task => task.entitiesGroup)
    tasks: Task[];

    @ManyToMany(type => Entities, entities => entities.entities_groups)
    @JoinTable()
    entities: Entities[];
}