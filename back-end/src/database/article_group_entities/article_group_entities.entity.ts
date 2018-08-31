import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Article } from '../article/article.entity'
import { EntitiesGroup } from '../entities_group/entities_group.entity'

@Entity()
export class ArticleGroupEntities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Article, article => article.article_group_entities)
    articles: Article[];

    @OneToOne(type => EntitiesGroup, entities_group => entities_group.article_group_entities)
    entities_group: EntitiesGroup;     
}