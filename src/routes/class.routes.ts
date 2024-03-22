import express from "express";
import { ClassesController } from "../controller/classController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const router = express.Router();

const classController = new ClassesController();

router.get('/',verifyKey, classController.getAllClasses);
router.get('/:id',verifyKey, classController.getClassById);
router.post('/',verifyKey, classController.createClass);
router.patch('/:id',verifyKey, classController.updateClass);
router.delete('/:id', verifyKey, classController.deleteClass);








export default router;