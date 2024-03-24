import express from "express";
import { UsersController } from "../controller/usersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";
const usersController = new UsersController();
const router = express.Router();

router.get('/', verifyKey, usersController.listStudents);
router.get('/:id', verifyKey, usersController.studentById);
//Obtener studentId por su id de usuario
router.get('/getStudentId/:id', verifyKey, usersController.getStudentIdByUserId);



export default router;