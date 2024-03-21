import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Teacher } from "./teacher";
import { Inscripcion } from "./inscription";

@Entity("classes")
export class Clase {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100 })
    dance?: string;

    @Column()
    day?: string;

    @Column({ type: 'time' })
    startTime?: string;

    @Column({ type: 'time' })
    endTime?: string;

    @ManyToOne(() => Teacher, teacher => teacher.classes)
    @JoinColumn({ name: "teacher_id" }) 
    teacher?: Teacher;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.clase)
    enrollments?: Inscripcion[];
}
