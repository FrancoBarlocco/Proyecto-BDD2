import { Router } from 'express';
import { getMatchesAndTeams } from '../controllers/matchController';
import { registerUser } from '../controllers/acessController';
import { login } from '../controllers/acessController';
import { postMatch } from '../controllers/matchController';
import { updateMatchResult } from '../controllers/matchController';
import { getStadiums } from '../controllers/stadiumController';
import { getRanking } from '../controllers/rankingController';
import { getPredictions } from '../controllers/predictController';
import { getStatisticsByCareer } from '../controllers/statisticController';
import { savePredictions } from '../controllers/predictController';
import { getTeams } from '../controllers/teamController';

const { check, validationResult } = require('express-validator');
const router = Router();

router.get('/getTeams', getTeams);
router.get('/getMatchesAndTeams', getMatchesAndTeams);
router.post('/postStudent', [check('Ci').matches(/^[0-9]+$/),check('Email').isEmail()], registerUser);
router.post('/getCredentials',check('Email').isEmail(), login);
router.post('/postMatch', postMatch);
router.post('/updateMatch/:matchId',[check('matchId').matches(/^[0-9]+$/)], updateMatchResult);
router.post('/savePredictions', savePredictions);
router.get('/getPredictions/:userId',[check('userId').matches(/^[0-9]+$/)], getPredictions);
router.get('/getStadiums', getStadiums);
router.get('/getRanking', getRanking);
router.get('/getStatistics', getStatisticsByCareer);

export default router;