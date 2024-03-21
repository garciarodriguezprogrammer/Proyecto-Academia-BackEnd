import { Request, Response } from "express";
import { Clase } from "../models/class";
import { Teacher } from "../models/teacher";
import { StatusCodes } from "http-status-codes";
// import { Inscripcion } from "../models/inscription";
// import { Student } from "../models/student";
// import { User } from "../models/user";
import AppDataSource from "../database/data-source";

export class ClassesController {
    // Crear una nueva clase
    async createClass(req: Request, res: Response): Promise<void> {
        const { dance, day, startTime, endTime, teacherId } = req.body;
        const classRepository = AppDataSource.getRepository(Clase);

        try {
            const newClass = new Clase();
            newClass.dance = dance;
            newClass.day = day;
            newClass.startTime = startTime;
            newClass.endTime = endTime;
            newClass.teacher = { id: teacherId } as Teacher;

            await classRepository.save(newClass);
            res.status(StatusCodes.CREATED).json(newClass);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error creating class",
            });
        }
    }

    // Obtener todas las clases
    async getAllClasses(req: Request, res: Response): Promise<void> {
        const classRepository = AppDataSource.getRepository(Clase);
    
        try {
            const classes = await classRepository.find({ 
                relations: ["teacher", "enrollments", "enrollments.student", "enrollments.student.user"] 
            });
            const formattedClasses = classes.map(clase => ({
                ...clase,
                enrollments: clase.enrollments?.map(enrollment => ({
                    studentId: enrollment.student?.id,
                    studentName: enrollment.student?.user?.userName, 
                }))
            }));
    
            res.json(formattedClasses);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving classes",
            });
        }
    }
    
    

    // Obtener una clase por ID
    async getClassById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const classRepository = AppDataSource.getRepository(Clase);

        try {
            const classDetail = await classRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["teacher", "enrollments"]
            });

            if (classDetail) {
                res.json(classDetail);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Class not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving class",
            });
        }
    }

    // Actualizar una clase
    async updateClass(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { dance, day, startTime, endTime, teacherId } = req.body;
        const classRepository = AppDataSource.getRepository(Clase);

        try {
            const classToUpdate = await classRepository.findOneBy({ id: parseInt(id) });
            if (classToUpdate) {
                classToUpdate.dance = dance || classToUpdate.dance;
                classToUpdate.day = day || classToUpdate.day;
                classToUpdate.startTime = startTime || classToUpdate.startTime;
                classToUpdate.endTime = endTime || classToUpdate.endTime;
                if (teacherId) classToUpdate.teacher = { id: teacherId } as Teacher;

                await classRepository.save(classToUpdate);
                res.status(StatusCodes.OK).json(classToUpdate);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Class not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error updating class",
            });
        }
    }

    // Eliminar una clase
    async deleteClass(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const classRepository = AppDataSource.getRepository(Clase);

        try {
            const deleteResult = await classRepository.delete(id);
            if (deleteResult.affected) {
                res.status(StatusCodes.OK).json({
                    message: "Class deleted successfully",
                });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Class not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error deleting class",
            });
        }
    }
}
