import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, Index} from "typeorm";
import { ContentLabelGroup } from '../contentLabelGroup/contentLabelGroup.entity'

@Entity()
export class ContentLabel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @Column("varchar")
    mainId: string;

    @Column({
        type: "integer",
        nullable: true
    })    
    parentId: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => ContentLabelGroup, contentLabelGroup => contentLabelGroup.contentLabels)
    contentLabelGroups: ContentLabelGroup[];
} 