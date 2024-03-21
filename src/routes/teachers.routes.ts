import express from "express";
import { UsersController } from "../controller/usersController";

const usersController = new UsersController();
const router = express.Router();

router.get('/', usersController.listTeachers);
router.get('/:id', usersController.teacherById);


export default router;