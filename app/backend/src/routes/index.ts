import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';
import matcheRouter from './matche.routes';
import leaderboardRouter from './leaderboard.routes';
// import loginRouter from './login.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matcheRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
