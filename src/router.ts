import express from "express";
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/users.routes'
import studentsRoutes from './routes/students.routes'
import teacherRoutes from './routes/teachers.routes'
import classRoutes from './routes/class.routes'
// -----------------------------------------------------------------------------

const router = express.Router();
//Registro y login de todos los usuarios
router.use("/api/auth", authRoutes);
//Todas las rutas de usuarios
router.use("/api/users", userRoutes);
//Rutas de students
router.use("/api/students", studentsRoutes);
//Todas las  rutas de profesores
router.use("/api/teachers", teacherRoutes);
//Todas las rutas de clases
router.use("/api/class", classRoutes);

export default router;
