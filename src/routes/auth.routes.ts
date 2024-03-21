import express from "express";
import { AuthController } from "../controller/authController";

const authController = new AuthController();
const router = express.Router();

router.post('/register/:role', authController.register);
router.post('/login', authController.loginUser);



export default router;