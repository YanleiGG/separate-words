import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from "typeorm";
import { Article } from '../article/article.entity'
import { WordsPropertyGroup } from '../words_property_group/words_property_group.entity'

@Entity()
export class ArticleGroupWordsProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Article, article => article.article_group_words_property)
    articles: Article[];   

    @OneToOne(type => WordsPropertyGroup, words_property_group => words_property_group.article_group_words_property)
    words_property_group: WordsPropertyGroup;       
}