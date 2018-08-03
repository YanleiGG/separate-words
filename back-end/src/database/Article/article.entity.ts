import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    separateWords: string;

    @Column()
    separateWordsProperty: string;

    @Column()
    markEntity: string;
}