import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { ClassifyGroup } from '../classify_group/classify_group.entity'

@Entity()
export class Classify {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    parentId: string;

    @ManyToOne(type => ClassifyGroup, classify_group => classify_group.classify)
    classify_group: string;
}