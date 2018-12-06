import {Entity, Column, Index, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Classify } from '../classify/classify.entity'

@Entity()
export class ClassifyGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Classify, classify => classify.classify_group)
    classify: Classify[];
}