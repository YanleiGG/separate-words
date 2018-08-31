import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { EntitiesGroup } from '../entities_group/entities_group.entity'

@Entity()
export class Entities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
      nullable: true
    })
    parentId: string;

    @ManyToOne(type => EntitiesGroup, entities_group => entities_group.entities)
    entities_group: string;
}