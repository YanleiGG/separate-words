import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany} from "typeorm";
import { Role } from '../role/role.entity'
import { Task } from '../task/task.entity'
import { Article } from "database/article/article.entity";

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
    
    @OneToMany(type => Article, article => article.user)
    articles: Article[];
}