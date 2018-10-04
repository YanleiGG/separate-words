import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Emotion } from '../emotion/emotion.entity'
import { SepWordsProperty } from '../sep_words_property/sep_words_property.entity'
import { MarkEntity } from '../mark_entity/mark_entity.entity'
import { Task } from '../task/task.entity'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column({
        nullable: true,
        type: "longtext"
    })
    text: string;

    @Column()
    state: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => Task, task => task.articles)
    task: Task;

    @OneToOne(type => Emotion, emotion => emotion.article)
    emotion: Emotion;

    @OneToOne(type => SepWordsProperty, sep_words_property => sep_words_property.article)
    sep_words_property: SepWordsProperty;

    @OneToOne(type => MarkEntity, mark_entity => mark_entity.article)
    mark_entity: MarkEntity;
}