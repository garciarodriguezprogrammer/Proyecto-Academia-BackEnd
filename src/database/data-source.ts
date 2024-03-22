import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Teacher } from "../models/teacher";
import { Student } from "../models/student";
import { Clase } from "../models/class";
import { Inscripcion } from "../models/inscription";

const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "",
    database: "academia",
    entities: [
        User,
        Teacher,
        Student,
        Clase,
        Inscripcion,
    ],
    migrations: [
        `${__dirname}/migrations/**/*{.js,.ts}`
    ],
    synchronize: false,
    logging: false, 
});


export default AppDataSource;
