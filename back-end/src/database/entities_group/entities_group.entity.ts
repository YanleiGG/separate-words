import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Entities } from '../entities/entities.entity'
import { ArticleGroupEntities } from '../article_group_entities/article_group_entities.entity'

@Entity()
export class EntitiesGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Entities, entities => entities.entities_group)
    entities: Entities[];

    @OneToOne(type => ArticleGroupEntities, article_group_entities => article_group_entities.entities_group)
    @JoinColumn()
    article_group_entities: ArticleGroupEntities; 
}