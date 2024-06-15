import { Router } from 'express';
import { getStudentByCi } from '../controllers/studentController';
import { getStudents } from '../controllers/studentController';
import { getTeamById } from '../controllers/teamControllet';
import { getTeams } from '../controllers/teamControllet';
import { getMatchesAndTeams } from '../controllers/matchController';
import { registerUser } from '../controllers/acessController';
import { login } from '../controllers/acessController';
import { postMatch } from '../controllers/matchController';
import { updateMatchResult } from '../controllers/matchController';
import { getStadiumById } from '../controllers/stadiumController';
import { getStadiums } from '../controllers/stadiumController';
import { getRanking } from '../controllers/rankingController';
import { getPredictions } from '../controllers/predictController';
import { getStatisticsByCareer } from '../controllers/statisticController';
import { savePredictions } from '../controllers/predictController';

const { check, validationResult } = require('express-validator');
const router = Router();

router.get('/getStudentByCi/:ci',[check('Ci').matches(/^[0-9]+$/),check('Email').isEmail()], getStudentByCi);
router.get('/getStudents', getStudents);
router.get('/getTeamById/:id', getTeamById);
router.get('/getTeams', getTeams);
router.get('/getMatchesAndTeams', getMatchesAndTeams);
router.post('/postStudent', [check('Ci').matches(/^[0-9]+$/),check('Email').isEmail()], registerUser);
router.post('/getCredentials',check('Email').isEmail(), login);
router.post('/postMatch', postMatch);
router.post('/updateMatch/:matchId', updateMatchResult);
router.post('/savePredictions', savePredictions);
router.get('/getPredictions/:userId', getPredictions);
router.get('/getStadiumsById/:id', getStadiumById);
router.get('/getStadiums', getStadiums);
router.get('/getRanking', getRanking);
router.get('/getStatistics', getStatisticsByCareer);

export default router;