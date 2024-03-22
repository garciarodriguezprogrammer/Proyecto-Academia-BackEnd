import express from "express";
import { UsersController } from "../controller/usersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const usersController = new UsersController();
const router = express.Router();

router.get('/', verifyKey, usersController.listTeachers);
router.get('/:id', verifyKey, usersController.teacherById);


export default router;