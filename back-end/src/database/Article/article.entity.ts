import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne} from "typeorm";
import { ArticleGroupClassify } from '../article_group_classify/article_group_classify.entity'
import { ArticleGroupEntities } from '../article_group_entities/article_group_entities.entity'
import { ArticleGroupWordsProperty } from '../article_group_words_property/article_group_words_property.entity';
import { ArticleEmotion } from '../article_emotion/article_emotion.entity'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("longtext")
    content: string;

    @Column("longtext")
    separateWords: string;

    @Column("longtext")
    separateWordsProperty: string;

    @Column("longtext")
    markEntity: string;

    @ManyToOne(type => ArticleGroupClassify, article_group_classify => article_group_classify.articles)
    article_group_classify: string;

    @ManyToOne(type => ArticleGroupEntities, article_group_entities => article_group_entities.articles)
    article_group_entities: string;    

    @ManyToOne(type => ArticleGroupWordsProperty, article_group_words_property => article_group_words_property.articles)
    article_group_words_property: string; 

    @OneToOne(type => ArticleEmotion, article_emotion => article_emotion.article)
    article_emotion: string;
}