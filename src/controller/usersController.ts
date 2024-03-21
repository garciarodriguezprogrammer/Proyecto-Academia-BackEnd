import { Request, Response } from "express";
import AppDataSource from "../database/data-source";
import { User, Role } from "../models/user";
import { StatusCodes } from "http-status-codes";

export class UsersController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        try {
            const users = await userRepository.find();
            res.status(StatusCodes.OK).json(users);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving users",
            });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const { id } = req.params;

        try {
            const user = await userRepository.findOneBy({ id: parseInt(id) });
            if (user) {
                res.status(StatusCodes.OK).json(user);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "User not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving user",
            });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create(req.body);

        try {
            await userRepository.save(newUser);
            res.status(StatusCodes.CREATED).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error creating user",
            });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const { id } = req.params;
        const updateData = req.body;

        try {
            const user = await userRepository.findOneBy({ id: parseInt(id) });
            if (user) {
                userRepository.merge(user, updateData);
                const result = await userRepository.save(user);
                res.status(StatusCodes.OK).json(result);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "User not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error updating user",
            });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const { id } = req.params;

        try {
            const result = await userRepository.delete(id);
            if (result) {
                res.status(StatusCodes.OK).json({
                    message: "User deleted successfully",
                });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "User not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error deleting user",
            });
        }
    }

    async listStudents(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const students = await userRepository.find({ where: { rol: Role.student } });
        res.json(students);
    }
    
    async studentById(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Obtén el ID del parámetro de la ruta
        const userRepository = AppDataSource.getRepository(User);
    
        try {
            // Intenta encontrar un usuario con el rol 'student' y el ID proporcionado
            const student = await userRepository.findOneBy({
                id: parseInt(id),
                rol: Role.student
            });
    
            if (student) {
                // Si se encuentra el estudiante, devolver los datos del estudiante
                res.status(StatusCodes.OK).json(student);
            } else {
                // Si no se encuentra el estudiante, devolver un error 404
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Student not found",
                });
            }
        } catch (error) {            
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving student",
            });
        }
    }

    async listTeachers(req: Request, res: Response): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const teachers = await userRepository.find({ where: { rol: Role.teacher } });
        res.json(teachers);
    }

    async teacherById(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Obtén el ID del parámetro de la ruta
        const userRepository = AppDataSource.getRepository(User);
    
        try {
            // Intenta encontrar un usuario con el rol 'student' y el ID proporcionado
            const teacher = await userRepository.findOneBy({
                id: parseInt(id),
                rol: Role.teacher
            });
    
            if (teacher) {
                // Si se encuentra el estudiante, devolver los datos del estudiante
                res.status(StatusCodes.OK).json(teacher);
            } else {
                // Si no se encuentra el estudiante, devolver un error 404
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Student not found",
                });
            }
        } catch (error) {
            // Si hay un error durante la recuperación del usuario, devolver un error 500
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving student",
            });
        }
    }
    
}
