import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Teacher } from "../models/teacher";
import { Student } from "../models/student";

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "",
    database: "academia",
    entities: [
        User,
        Teacher,
        Student
    ],
    migrations: [
        `${__dirname}/migrations/**/*{.js,.ts}`
    ],
    synchronize: false,
    logging: false, 
});

AppDataSource.initialize ()
    .then(()=>{
        console.log ("Se ha conetado la base de datos ...🚀")
    })
    .catch((error)=>{
        console.log ("Ha habido un error: "+ error)
    })
