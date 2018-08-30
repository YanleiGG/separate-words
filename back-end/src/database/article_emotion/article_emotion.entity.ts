import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ArticleEmotion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    perspective: string;    // 主观句（subjective）和客观句（objective）

    @Column()
    attitude: string;    // 情感极性分类：正面（pos）、负面（neg）、中性/无明显情感(neutral)

    @Column()
    degree: string;    // 情感强度识别：1-5打分

    @Column()
    emotion: string;   // 喜、怒、哀、乐、惊、惧
}