import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./student";
import { Teacher } from "./teacher";

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

    @Column({length: 255})
    password!: string;

    @Column({length: 20})
    phoneNumber!: string;

    @Column({length: 100})
    address!: string;

    @Column({type: "enum", enum: Role, default: Role.student})
    rol?: Role;

    @OneToOne(() => Student, student => student.user)
    student?: Student;

    @OneToOne(() => Teacher, teacher => teacher.user)
    teacher?: Teacher;

    @CreateDateColumn()
    created_at?: Date; 
    
    @UpdateDateColumn()
    updated_at?: Date; 
}