import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, Index} from "typeorm";
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

    @ManyToMany(type => WordsPropertyGroup, words_property_group => words_property_group.words_propertys)
    words_property_groups: WordsPropertyGroup[];
} 