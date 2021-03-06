import {
    OneToMany, Entity, Column, PrimaryGeneratedColumn, 
    ManyToMany, CreateDateColumn, UpdateDateColumn, 
    JoinTable, ManyToOne, Index} from "typeorm";
import { User } from '../user/user.entity'
import { Article } from '../article/article.entity'
import { Type } from '../type/type.entity'
import { WordsPropertyGroup } from '../words_property_group/words_property_group.entity'
import { EntitiesGroup } from '../entities_group/entities_group.entity'
import { EmotionTypeGroup } from '../emotionTypeGroup/emotionTypeGroup.entity'
import { ContentLabelGroup } from '../contentLabelGroup/contentLabelGroup.entity'
import { Docs } from '../docs/docs.entity'

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

    @Column()
    deleted: number; // 0: 未删除， 1: 已删除

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => User, user => user.tasks)
    @JoinTable()
    users: User[];

    @OneToMany(type => Article, article => article.task)
    articles: Article[];

    @ManyToOne(type => WordsPropertyGroup, wordsPropertyGroup => wordsPropertyGroup.tasks)
    wordsPropertyGroup: WordsPropertyGroup;

    @ManyToOne(type => EntitiesGroup, entitiesGroup => entitiesGroup.tasks)
    entitiesGroup: EntitiesGroup;

    @ManyToOne(type => EmotionTypeGroup, emotionTypeGroup => emotionTypeGroup.tasks)
    emotionTypeGroup: EmotionTypeGroup;

    @ManyToOne(type => ContentLabelGroup, contentLabelGroup => contentLabelGroup.tasks)
    contentLabelGroup: ContentLabelGroup;

    @ManyToOne(type => Docs, docs => docs.tasks)
    docs: Docs;

    @ManyToMany(type => Type, type => type.tasks)
    @JoinTable()
    types: Type[];
}