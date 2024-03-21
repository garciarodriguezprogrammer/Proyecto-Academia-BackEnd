import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { User } from "./user";
import { Clase } from "./class";

@Entity("teachers")
export class Teacher {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user?: User;

    @OneToMany(() => Clase, clase => clase.teacher)
    classes?: Clase[];
}