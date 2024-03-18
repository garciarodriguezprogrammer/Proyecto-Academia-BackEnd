"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const teacher_1 = require("../models/teacher");
const student_1 = require("../models/student");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "",
    database: "academia",
    entities: [
        user_1.User,
        teacher_1.Teacher,
        student_1.Student
    ],
    migrations: [
        `${__dirname}/migrations/**/*{.js,.ts}`
    ],
    synchronize: false,
    logging: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Se ha conetado la base de datos ...🚀");
})
    .catch((error) => {
    console.log("Ha habido un error: " + error);
});
