import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Task } from '../task/task.entity'
import { Docs } from "database/docs/docs.entity";


@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => Task, task => task.types)
    tasks: Task[];

    @ManyToOne(type => Docs, docs => docs.type)
    docses: Docs[];
}