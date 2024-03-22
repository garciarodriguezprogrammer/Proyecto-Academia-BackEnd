import express from "express";
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/users.routes'
import studentsRoutes from './routes/students.routes'
import teacherRoutes from './routes/teachers.routes'
import classRoutes from './routes/class.routes'
import inscripcionRoutes from './routes/inscription.routes'
// -----------------------------------------------------------------------------

const router = express.Router();
router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/students", studentsRoutes);
router.use("/api/teachers", teacherRoutes);
router.use("/api/class", classRoutes);
router.use("/api/inscription", inscripcionRoutes);

export default router;
