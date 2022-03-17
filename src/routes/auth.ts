import { Request, Response, Router } from "express";
import { errorMiddleware, responseMiddleware } from "../middleware/responseMiddleware";
import { authentication } from "../controllers/authController";
import httpStatus from "http-status";

const router: Router = Router();

router.get('/status', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('AUTHENTICATION WORKING');
});

// POST = AUTENTICATION
router.post("/",
    authentication,
    responseMiddleware,
    errorMiddleware
);


export default router
