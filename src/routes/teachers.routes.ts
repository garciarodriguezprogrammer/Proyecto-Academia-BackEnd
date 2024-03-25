import express from "express";
import { UsersController } from "../controller/usersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const usersController = new UsersController();
const router = express.Router();

router.get('/', verifyKey, isAdmin, usersController.listTeachers);
router.get('/:id', verifyKey, usersController.teacherById);
//Obtener teacherId por su id de usuario
router.get('/getTeacherId/:id', verifyKey, usersController.getTeacherIdByUserId);

export default router;