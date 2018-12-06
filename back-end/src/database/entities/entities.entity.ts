import {Entity, ManyToMany, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index} from "typeorm";
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

    @ManyToMany(type => EntitiesGroup, entities_group => entities_group.entities)
    entities_groups: string;
}