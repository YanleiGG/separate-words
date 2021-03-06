import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index} from "typeorm";
import { Article } from '../article/article.entity'
import { MarkEntity } from "../mark_entity/mark_entity.entity";

@Entity()
export class Emotion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    perspective: string;    // 主观句（subjective）和客观句（objective）

    @Column({ nullable: true })
    attitude: string;    // 情感极性分类：正面（pos）、负面（neg）、中性/无明显情感(neutral)

    @Column({ nullable: true })
    degree: string;    // 情感强度识别：1-5打分

    @Column({ nullable: true })
    emotion: string;   // 喜、怒、哀、乐、惊、惧

    @Column({
        type: "longtext",
        nullable: true
    })
    markEntity: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(type => Article, article => article.emotion)
    @JoinColumn()
    article: Article;
}