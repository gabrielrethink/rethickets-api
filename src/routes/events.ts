import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import { findAllEvents, findEventById, createEvent, editEvent, joinEvent, deleteEventById } from "../controllers/eventsController";
import { errorMiddleware, responseMiddleware } from "../middleware/responseMiddleware";
import { editEventValidateBody, joinEventValidate, newEventValidateBody } from "../middleware/yupMiddleware";

const router: Router = Router();

router.get('/status', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('AUTHENTICATION WORKING');
});

// GET = All users
router.get("/",
    findAllEvents,
    responseMiddleware,
    errorMiddleware
);

// GET = Find User By ID
router.get("/:id",
    findEventById,
    responseMiddleware,
    errorMiddleware
);

// POST = Create User
router.post("/",
    newEventValidateBody,
    createEvent,
    responseMiddleware,
    errorMiddleware
);

// PATCH = Edit a Event data
router.patch("/:id",
    editEventValidateBody,
    editEvent,
    responseMiddleware,
    errorMiddleware
);

// DELETE = Delete a user
router.delete("/:id",
    deleteEventById,
    responseMiddleware,
    errorMiddleware
);

// POST = Create User
router.post('/join/:id',
    joinEventValidate,
    joinEvent,
    responseMiddleware,
    errorMiddleware
);

export default router
