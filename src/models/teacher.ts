import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./user";

@Entity("teacher")
export class Teacher {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => User, user => user.id) 
    user?: User

}