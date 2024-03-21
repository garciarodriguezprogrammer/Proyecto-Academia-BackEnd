import express from "express";
import { UsersController } from "../controller/usersController";

const usersController = new UsersController();
const router = express.Router();

router.get('/', usersController.listStudents);
router.get('/:id', usersController.studentById);


export default router;