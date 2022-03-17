import { Response } from "express";
import httpStatus from "http-status";

const statusResponse = (
    res: Response,
    info: any
) => {
    res.status(httpStatus.OK).json({ status: info });
};

const responseMiddleware = (
    res: Response,
) => {
    const statusToSend = res.locals.status || httpStatus.OK;

    if (statusToSend >= httpStatus.BAD_REQUEST) {
        res.status(statusToSend).json({
            message: res.locals.message,
        });
    }
    res.status(statusToSend).json(res.locals.data);
};

const errorMiddleware = async (
    res: Response,
) => {
    const statusToSend = res.locals.status || httpStatus.INTERNAL_SERVER_ERROR;

    res.status(statusToSend).json({
        message: res.locals.message || "Internal Server Error",
    });
};

export { responseMiddleware, errorMiddleware, statusResponse };
