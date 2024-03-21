import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Inscripcion } from "./inscription";

export enum Level {
    beginner = "beginner",
    medium = "medium",
    advanced = "advanced"
}
@Entity("students")
export class Student {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user?: User;


    @Column({type: "enum", enum: Level, default: Level.beginner})
    level?: Level

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.student)
    enrollments?: Inscripcion[];
}