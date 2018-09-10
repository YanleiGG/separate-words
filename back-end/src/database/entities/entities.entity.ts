import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { EntitiesGroup } from '../entities_group/entities_group.entity'

@Entity()
export class Entities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => EntitiesGroup, entities_group => entities_group.entities)
    entities_group: string;
}