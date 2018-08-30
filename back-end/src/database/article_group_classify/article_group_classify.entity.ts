import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from "typeorm";
import { Article } from '../article/article.entity'
import { ClassifyGroup } from '../classify_group/classify_group.entity'

@Entity()
export class ArticleGroupClassify {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Article, article => article.article_group_classify)
    articles: Article[];    

    @OneToOne(type => ClassifyGroup, classify_group => classify_group.article_group_classify)
    classify_group: ClassifyGroup; 
} 