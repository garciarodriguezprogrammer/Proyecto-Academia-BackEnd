import express from "express";
import { ClassesController } from "../controller/classController";
import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const router = express.Router();

const classController = new ClassesController();

router.get('/',verifyKey, classController.getAllClasses);
router.get('/:id',verifyKey, classController.getClassById);
router.post('/',verifyKey, isAdmin, classController.createClass); 
router.patch('/:id',verifyKey, isAdmin, classController.updateClass);
router.delete('/:id', verifyKey, isAdmin, classController.deleteClass);








export default router;