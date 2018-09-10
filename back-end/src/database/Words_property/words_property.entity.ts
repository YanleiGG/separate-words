import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { WordsPropertyGroup } from '../words_property_group/words_property_group.entity'

@Entity()
export class WordsProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @Column("varchar")
    symbol: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => WordsPropertyGroup, words_property_group => words_property_group.words_property)
    words_property_group: string;
} 