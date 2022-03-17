import { Request, Response, Router } from "express";
import eventsRoutes from './events'
import userRoutes from './user'
import authRoutes from './auth'
import httpStatus from "http-status";

const router: Router = Router();

router.use('/events', eventsRoutes)
router.use('/user', userRoutes)
router.use('/auth', authRoutes)

router.get('/status', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('AUTHENTICATION WORKING');
});

export default router;