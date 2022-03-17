import { Request, Response, Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const insert = await authController.authentication(req.body)
        res.send(insert)
    } catch (error) {
        console.log(error)
    }
});

export default router
