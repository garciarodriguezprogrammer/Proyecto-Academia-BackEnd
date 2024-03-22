import { Request, Response } from "express";
import AppDataSource from "../database/data-source";
import { Inscripcion } from "../models/inscription";
import { StatusCodes } from "http-status-codes";
import { Student } from "../models/student";
import { Clase } from "../models/class";

export class InscriptionsController {
    // Crear una nueva inscripción
    async createInscription(req: Request, res: Response): Promise<void> {
        const { studentId, classId } = req.body;
        const inscriptionRepository = AppDataSource.getRepository(Inscripcion);

        try {
            const newInscription = new Inscripcion();
            newInscription.student = { id: studentId } as Student;
            newInscription.clase = { id: classId } as Clase;

            await inscriptionRepository.save(newInscription);
            res.status(StatusCodes.CREATED).json(newInscription);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error creating inscription",
            });
        }
    }

    // Obtener todas las inscripciones
    async getAllInscriptions(req: Request, res: Response): Promise<void> {
        const inscriptionRepository = AppDataSource.getRepository(Inscripcion);

        try {
            const inscriptions = await inscriptionRepository.find({
                relations: ["student","student.user", "clase"]
            });
            const transformInscription = inscriptions.map(inscription => ({
                studentName: inscription?.student?.user?.userName, 
                studentId: inscription.student?.id,
                classId: inscription.clase?.id,
                dance: inscription.clase?.dance,
                day: inscription.clase?.day,
                startTime: inscription.clase?.startTime
            })) 
            res.json(transformInscription);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving inscriptions",
            });
        }
    }

    // Obtener una inscripción por ID
    async getInscriptionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const inscriptionRepository = AppDataSource.getRepository(Inscripcion);

        try {
            const inscription = await inscriptionRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["student", "clase"]
            });

            if (inscription) {
                res.json(inscription);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Inscription not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error retrieving inscription",
            });
        }
    }

    // Actualizar una inscripción
    async updateInscription(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { studentId, classId } = req.body;
        const inscriptionRepository = AppDataSource.getRepository(Inscripcion);

        try {
            const inscriptionToUpdate = await inscriptionRepository.findOneBy({ id: parseInt(id) });
            if (inscriptionToUpdate) {
                inscriptionToUpdate.student = { id: studentId } as Student;
                inscriptionToUpdate.clase = { id: classId } as Clase;

                await inscriptionRepository.save(inscriptionToUpdate);
                res.status(StatusCodes.OK).json(inscriptionToUpdate);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Inscription not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error updating inscription",
            });
        }
    }

    // Eliminar una inscripción
    async deleteInscription(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const inscriptionRepository = AppDataSource.getRepository(Inscripcion);

        try {
            const deleteResult = await inscriptionRepository.delete(id);
            if (deleteResult.affected) {
                res.status(StatusCodes.OK).json({
                    message: "Inscription deleted successfully",
                });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Inscription not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error deleting inscription",
            });
        }
    }
}
