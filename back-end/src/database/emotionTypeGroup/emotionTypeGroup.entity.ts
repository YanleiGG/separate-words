import {
    Entity,JoinTable, Column, PrimaryGeneratedColumn, 
    ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, Index
} from "typeorm";
import { EmotionType } from '../emotionType/emotionType.entity'
import { Task } from '../task/task.entity'

@Entity()
export class EmotionTypeGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Task, task => task.emotionTypeGroup)
    tasks: Task[];

    @ManyToMany(type => EmotionType, emotionType => emotionType.emotionTypeGroups)
    @JoinTable()
    emotionTypes: EmotionType[];
}