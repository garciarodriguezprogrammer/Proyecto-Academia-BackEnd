import express from "express";
import { UsersController } from "../controller/usersController";

const usersController = new UsersController();
const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);





export default router;