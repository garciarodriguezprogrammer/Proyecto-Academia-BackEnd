import { User, Role } from "../../models/user";
import AppDataSource from "../data-source";

const userData = [
    { userName: "teacher1", email: "teacher1@example.com", password: "password1", phoneNumber: "1234567890", address: "432 Main St", rol: Role.teacher },
    { userName: "teacher2", email: "teacher2@example.com", password: "password2", phoneNumber: "0987654321", address: "644 Side St", rol: Role.teacher },
    // Añade más usuarios según sea necesario
];

AppDataSource.initialize()
    .then(async () => {
        const userRepository = AppDataSource.getRepository(User);
        const users = userRepository.create(userData); // Crea instancias de usuario
        await userRepository.save(users); // Guarda los usuarios en la base de datos
        console.log("Seeders de usuarios ejecutados");
    })
    .catch(error => console.log('Error ejecutando seeders: ' + error));
