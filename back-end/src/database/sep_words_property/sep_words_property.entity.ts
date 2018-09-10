import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Article } from '../article/article.entity'

@Entity()
export class SepWordsProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "longtext",
        nullable: true
    })
    separateWords: string;    // 分词

    @Column({
        type: "longtext",
        nullable: true
    })
    separateWordsProperty: string;    // 划分词性

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(type => Article, article => article.sep_words_property)
    @JoinColumn()
    article: Article;     
}