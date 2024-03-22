import express from "express";
import { InscriptionsController } from "../controller/inscriptionController";

import verifyKey from "../middleware/authMiddleware";
import isAdmin from "../middleware/adminMiddleware";

const inscriptionsController = new InscriptionsController();
const router = express.Router();


router.get('/', verifyKey, inscriptionsController.getAllInscriptions);
router.get('/:id', verifyKey, inscriptionsController.getInscriptionById);
router.post('/', verifyKey, inscriptionsController.createInscription);
router.patch('/:id', verifyKey, inscriptionsController.updateInscription);
router.delete('/:id',verifyKey,  inscriptionsController.deleteInscription);



export default router;