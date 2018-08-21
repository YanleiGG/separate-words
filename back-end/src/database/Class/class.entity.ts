import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    content: string;

    @Column("integer")
    parentId: number;

}