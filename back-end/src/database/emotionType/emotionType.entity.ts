import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, Index} from "typeorm";
import { EmotionTypeGroup } from '../emotionTypeGroup/emotionTypeGroup.entity'

@Entity()
export class EmotionType {
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

    @ManyToMany(type => EmotionTypeGroup, emotionTypeGroup => emotionTypeGroup.emotionTypes)
    emotionTypeGroups: EmotionTypeGroup[];
} 