import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Article } from '../article/article.entity'

@Entity()
export class MarkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "longtext",
        nullable: true
    })
    markEntity: string;    // 实体

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(type => Article, article => article.mark_entity)
    @JoinColumn()
    article: Article;     
}