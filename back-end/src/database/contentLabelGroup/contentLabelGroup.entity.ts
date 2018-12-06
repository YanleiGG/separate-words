import {
    Entity,JoinTable, Column, PrimaryGeneratedColumn, 
    ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, Index
} from "typeorm";
import { ContentLabel } from '../contentLabel/contentLabel.entity'
import { Task } from '../task/task.entity'

@Entity()
export class ContentLabelGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Task, task => task.contentLabelGroup)
    tasks: Task[];

    @ManyToMany(type => ContentLabel, contentLabel => contentLabel.contentLabelGroups)
    @JoinTable()
    contentLabels: ContentLabel[];
}