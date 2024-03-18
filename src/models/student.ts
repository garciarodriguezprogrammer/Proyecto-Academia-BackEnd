import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./user";

export enum Level {
    beginner = "beginner",
    medium = "medium",
    advanced = "advanced"
}
@Entity("student")
export class Student {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => User, user => user.id)
    user?: User

    @Column({type: "enum", enum: Level, default: Level.beginner})
    level?: Level

}