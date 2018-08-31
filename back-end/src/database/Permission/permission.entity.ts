import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Role } from '../role/role.entity'

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    path: string;

    @Column()
    method: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];
}