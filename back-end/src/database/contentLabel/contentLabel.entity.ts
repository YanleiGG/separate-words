import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
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
        type: "varchar",
        nullable: true
    })    
    parentId: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => ContentLabelGroup, contentLabelGroup => contentLabelGroup.contentLabels)
    contentLabelGroup: ContentLabelGroup;
} 