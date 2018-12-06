import {Entity, Column, Index, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { User } from '../user/user.entity'

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(type => User, user => user.roles)
    @JoinTable()
    users: User[];
}