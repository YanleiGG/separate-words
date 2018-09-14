import {OneToMany, Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable} from "typeorm";
import { User } from '../user/user.entity'
import { Article } from '../article/article.entity'
import { Type } from '../type/type.entity'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    instruction: string;

    @Column()
    state: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => User, user => user.tasks)
    @JoinTable()
    users: User[];

    @OneToMany(type => Article, article => article.task)
    articles: Article[];

    @ManyToMany(type => Type, type => type.tasks)
    @JoinTable()
    types: Type[];
}