import { User } from "../models/user";
import { Response, Request } from "express";
import { AppDataSource } from "../database/data-source";

export class UsersController {
    async getAll(req: Request, res: Response) {
        const users = await AppDataSource.getRepository(User).find();
        return res.json(users);
    }

    //Recuperar un usuario por ID
    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid ID"
            });
        }

        const user = await AppDataSource.getRepository(User).findOne({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.json(user);
    }
}