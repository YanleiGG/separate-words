import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Article } from '../article/article.entity'
import { ClassifyGroup } from '../classify_group/classify_group.entity'

@Entity()
export class ArticleGroupClassify {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Article, article => article.article_group_classify)
    articles: Article[];    

    @OneToOne(type => ClassifyGroup, classify_group => classify_group.article_group_classify)
    classify_group: ClassifyGroup; 
} 