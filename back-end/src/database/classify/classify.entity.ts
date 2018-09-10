import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { ClassifyGroup } from '../classify_group/classify_group.entity'

@Entity()
export class Classify {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column({
      nullable: true
    })
    parentId: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => ClassifyGroup, classify_group => classify_group.classify)
    classify_group: string;
}