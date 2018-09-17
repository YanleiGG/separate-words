import {
    Entity,JoinTable, Column, PrimaryGeneratedColumn, 
    ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany 
} from "typeorm";
import { WordsProperty } from '../words_property/words_property.entity'
import { Task } from '../task/task.entity'

@Entity()
export class WordsPropertyGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Task, task => task.wordsPropertyGroup)
    tasks: Task[];

    @ManyToMany(type => WordsProperty, words_property => words_property.words_property_groups)
    @JoinTable()
    words_propertys: WordsProperty[];
}