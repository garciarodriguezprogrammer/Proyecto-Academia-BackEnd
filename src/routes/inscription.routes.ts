import express from "express";
import { InscriptionsController } from "../controller/inscriptionController";

import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const inscriptionsController = new InscriptionsController();
const router = express.Router();


router.get('/', verifyKey, isAdmin, inscriptionsController.getAllInscriptions);
//Obtener las inscripciones por id de Inscripciones
router.get('/:id', verifyKey, inscriptionsController.getInscriptionById);
router.post('/', verifyKey, inscriptionsController.createInscription);
router.patch('/:id', verifyKey, inscriptionsController.updateInscription);
router.delete('/:id',verifyKey,  inscriptionsController.deleteInscription);
//Obtener las inscripciones por id de estudiante
router.get('/byStudent/:id',  inscriptionsController.getInscriptionByStudent); //volver a añadir verifykey



export default router;