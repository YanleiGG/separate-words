import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
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

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];
}