import express from "express";
import { UsersController } from "../controller/usersController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const usersController = new UsersController();
const router = express.Router();

router.get('/', verifyKey, isAdmin, usersController.getAllUsers);
router.get('/:id', verifyKey, usersController.getUserById);
router.post('/', verifyKey, usersController.createUser);
router.patch('/:id', verifyKey, usersController.updateUser);
router.delete('/:id', verifyKey, usersController.deleteUser);

router.get('/students', usersController.listStudents);




export default router;