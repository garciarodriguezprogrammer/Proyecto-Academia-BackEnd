import express from "express";
import { ClassesController } from "../controller/classController";
const router = express.Router();

const classController = new ClassesController();

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', classController.createClass);
router.patch('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);








export default router;