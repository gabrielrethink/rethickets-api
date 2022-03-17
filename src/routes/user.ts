import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import { findAllUser, findUserById, createUser, editUser, joinEvent, deleteUserById } from "../controllers/usersController";
import { errorMiddleware, responseMiddleware } from "../middleware/responseMiddleware";
import { editUserValidateBody, joinEventValidate, newUserValidateBody } from "../middleware/yupMiddleware";

const router: Router = Router();

router.get('/status', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('AUTHENTICATION WORKING');
});

// GET = All users
router.get("/",
    findAllUser,
    responseMiddleware,
    errorMiddleware
);

// GET = Find User By ID
router.get("/:id",
    findUserById,
    responseMiddleware,
    errorMiddleware
);

// POST = Create User
router.post("/",
    newUserValidateBody,
    createUser,
    responseMiddleware,
    errorMiddleware
);

// PATCH = Edit a user data
router.patch("/:id",
    editUserValidateBody,
    editUser,
    responseMiddleware,
    errorMiddleware
);

// DELETE = Delete a user
router.delete("/:id",
    deleteUserById,
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
