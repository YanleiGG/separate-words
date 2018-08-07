import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("longtext")
    content: string;

    @Column("longtext")
    separateWords: string;

    @Column("longtext")
    separateWordsProperty: string;

    @Column("longtext")
    markEntity: string;
}