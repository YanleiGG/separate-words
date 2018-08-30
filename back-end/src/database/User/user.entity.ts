import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Role } from '../role/role.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @ManyToOne(type => Role, role => role.users)
    role: string;
}