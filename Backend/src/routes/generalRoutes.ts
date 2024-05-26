import { Router } from 'express';
import { getStudentByCi } from '../controllers/studentController';

const router = Router();

router.get('/getStudentByCi', getStudentByCi);


export default router;