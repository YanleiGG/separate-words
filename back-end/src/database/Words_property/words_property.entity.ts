import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { WordsPropertyGroup } from '../words_property_group/words_property_group.entity'

@Entity()
export class WordsProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    content: string;

    @Column("integer")
    parentId: number;

    @ManyToOne(type => WordsPropertyGroup, words_property_group => words_property_group.words_property)
    words_property_group: string;
} 