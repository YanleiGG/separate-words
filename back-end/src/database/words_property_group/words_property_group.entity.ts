import {Entity,JoinTable, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { WordsProperty } from '../words_property/words_property.entity'

@Entity()
export class WordsPropertyGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => WordsProperty, words_property => words_property.words_property_groups)
    @JoinTable()
    words_propertys: WordsProperty[];
}