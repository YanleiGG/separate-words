import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Classify } from '../classify/classify.entity'
import { ArticleGroupClassify } from '../article_group_classify/article_group_classify.entity'

@Entity()
export class ClassifyGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Classify, classify => classify.classify_group)
    classify: Classify[];

    @OneToOne(type => ArticleGroupClassify, article_group_classify => article_group_classify.classify_group)
    @JoinColumn()
    article_group_classify: ArticleGroupClassify;
}