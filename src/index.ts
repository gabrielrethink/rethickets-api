import 'dotenv/config'
import express, { Request, Response, Router } from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import httpStatus from 'http-status';


const app = express()
const router: Router = Router();

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
    router.get("/", (req: Request, res: Response) => {
        res.status(httpStatus.OK).json({
            message: "rethinket is running...",
            version: "1.0.0",
        });
    })
);

app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});