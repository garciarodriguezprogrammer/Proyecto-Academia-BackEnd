import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum Role {
    admin = "admin", 
    teacher = "teacher",
    student = "student"
}
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 100})
    userName!: string;

    @Column({length: 100})
    email!: string;

    @Column({length: 20})
    password!: string;

    @Column({length: 20})
    phoneNumber!: string;

    @Column({length: 100})
    address!: string;

    @Column({type: "enum", enum: Role, default: Role.student})
    rol?: Role;

    @CreateDateColumn()
    created_at?: Date; 
    
    @UpdateDateColumn()
    updated_at?: Date; 
}