import { Router } from 'express';
import { getStudentByCi } from '../controllers/studentController';
import { getStudents } from '../controllers/studentController';
import { getTeamById } from '../controllers/teamControllet';
import { getTeams } from '../controllers/teamControllet';
import { getMatchById } from '../controllers/matchController';
import { getMatches } from '../controllers/matchController';
import { getMatchesAndTeams } from '../controllers/matchController';
import { registerUser } from '../controllers/acessController';
import { login } from '../controllers/acessController';

const router = Router();

router.get('/getStudentByCi/:ci', getStudentByCi);
router.get('/getStudents', getStudents);
router.get('/getTeamById/:id', getTeamById);
router.get('/getTeams', getTeams);
router.get('/getMatchById/:id', getMatchById);
router.get('/getMatches', getMatches);
router.get('/getMatchesAndTeams', getMatchesAndTeams);
router.post('/postStudent', registerUser);
router.post('/getCredentials', login);

export default router;