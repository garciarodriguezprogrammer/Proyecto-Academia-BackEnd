import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Student } from "./student";
import { Clase } from "./class";

@Entity("inscriptions")
export class Inscripcion {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Student, student => student.enrollments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "student_id" })
    student?: Student;

    @ManyToOne(() => Clase, clase => clase.enrollments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "class_id" })
    clase?: Clase;
}
