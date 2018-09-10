import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { ArticleGroupClassify } from '../article_group_classify/article_group_classify.entity'
import { ArticleGroupEntities } from '../article_group_entities/article_group_entities.entity'
import { ArticleGroupWordsProperty } from '../article_group_words_property/article_group_words_property.entity';
import { Emotion } from '../emotion/emotion.entity'
import { SepWordsProperty } from '../sep_words_property/sep_words_property.entity'
import { MarkEntity } from '../mark_entity/mark_entity.entity'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("longtext")
    content: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => ArticleGroupClassify, article_group_classify => article_group_classify.articles)
    article_group_classify: string;

    @ManyToOne(type => ArticleGroupEntities, article_group_entities => article_group_entities.articles)
    article_group_entities: string;    

    @ManyToOne(type => ArticleGroupWordsProperty, article_group_words_property => article_group_words_property.articles)
    article_group_words_property: string; 

    @OneToOne(type => Emotion, emotion => emotion.article)
    emotion: string;

    @OneToOne(type => SepWordsProperty, sep_words_property => sep_words_property.article)
    sep_words_property: string;

    @OneToOne(type => MarkEntity, mark_entity => mark_entity.article)
    mark_entity: string;
}