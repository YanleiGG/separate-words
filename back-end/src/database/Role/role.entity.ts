import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { User } from '../user/user.entity'
import { Permission } from '../permission/permission.entity';

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

    @OneToMany(type => User, user => user.role)
    users: User[];

    @ManyToMany(type => Permission, permission => permission.roles)
    @JoinTable()
    permissions: Permission[];
}