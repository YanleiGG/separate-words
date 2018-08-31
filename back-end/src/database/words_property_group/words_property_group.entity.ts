import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { WordsProperty } from '../words_property/words_property.entity'
import { ArticleGroupWordsProperty }  from '../article_group_words_property/article_group_words_property.entity'

@Entity()
export class WordsPropertyGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @Column("integer")
    parentId: number;

    @OneToMany(type => WordsProperty, words_property => words_property.words_property_group)
    words_property: WordsProperty[];    

    @OneToOne(type => ArticleGroupWordsProperty, article_group_words_property => article_group_words_property.words_property_group)
    @JoinColumn()
    article_group_words_property: ArticleGroupWordsProperty; 
}