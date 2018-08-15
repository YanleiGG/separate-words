import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("longtext")
    single: string;

    @Column("longtext")
    double: string;

    @Column("longtext")
    much: string;
}