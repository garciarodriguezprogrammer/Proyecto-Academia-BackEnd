import { Request, Response } from "express";
import { User, Role } from "../models/user";
import { Student } from "../models/student";
import { Teacher } from "../models/teacher";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/data-source";
const secretKey = process.env.JWT_SECRET_KEY || "123456789";

export class AuthController {
    async register(req: Request, res: Response): Promise <void|Response<any>> {   
        const { userName, email, password, phoneNumber, address } = req.body;
        const role: Role = req.params.role as Role; // Obtiene el rol de los parámetros de la ruta

        // Validar el rol
        if (!Object.values(Role).includes(role)) { 
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid role provided",
            });
        }

        const userRepository = AppDataSource.getRepository(User);
        const studentRepository = AppDataSource.getRepository(Student);
        const teacherRepository = AppDataSource.getRepository(Teacher);

        try {
            // Verificar si el usuario ya existe
            const oldUser = await userRepository.findOneBy({ email });
            if (oldUser) {
                return res.status(StatusCodes.CONFLICT).json({
                    message: "User already exists. Please login.",
                });
            }

            // Encriptar contraseña del usuario
            const encryptedPassword = bcrypt.hashSync(password, 10);

            // Crear registro de usuario en la base de datos
            const newUser = new User();
            newUser.userName = userName;
            newUser.email = email;
            newUser.password = encryptedPassword;
            newUser.phoneNumber = phoneNumber;
            newUser.address = address;
            newUser.rol = role;


            const savedUser = await userRepository.save(newUser);
            // Crear registro en la tabla correspondiente basada en el rol
            if (role === Role.student) {
                const newStudent = new Student();
                newStudent.user = savedUser; // Asociar el usuario recién creado
                await studentRepository.save(newStudent);
            } else if (role === Role.teacher) {
                const newTeacher = new Teacher();
                newTeacher.user = savedUser; // Asociar el usuario recién creado
                await teacherRepository.save(newTeacher);
            }

            // Guardar el usuario en la base de datos
           

            // Devolver una respuesta exitosa
            return res.status(StatusCodes.CREATED).json({
                message: "User registered successfully",
            });
        } catch (error) {
            console.log(error); // Para propósitos de depuración
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error while creating user",
            });
        }
    }

    async loginUser(req: Request, res: Response): Promise <Response>{
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const user = await userRepository.findOneBy({ email });

            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Incorrect email or password",
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Incorrect email or password",
                });
            }
            //aquí se construye el cuerpo del token
            const tokenPayload = {
                id: user.id,
                userName: user.userName,
                rol: user.rol
            };

            const token = jwt.sign(tokenPayload, secretKey, {
                expiresIn: "3h",
            });

            return res.status(StatusCodes.OK).json({
                message: "Login successfully",
                token,
            });
        } catch (error) {
            console.log(error); // Para propósitos de depuración
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error while logging in",
            });
        }
    }
}
