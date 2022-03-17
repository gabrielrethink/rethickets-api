import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';



export const newUserValidateBody = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const newUserScheme = yup.object().shape({
            password: yup.string().required("password is Required"),
            username: yup.string().required("username is Required"),
            first_name: yup.string().required("first_name is Required"),
            last_name: yup.string().required("last_name is Required"),
            email: yup.string().email().required("email is Required"),
        });
        await newUserScheme.validate(req.body)
        next()
    } catch (error) {
        res.locals.status = 400;
        next(error.message)
        console.log(error.message)
    }
}

export const editUserValidateBody = (data: UserEditType) => {
    try {
        const editUserScheme = yup.object().shape({
            id: yup.number().required().positive().integer(),
            username: yup.string(),
            password: yup.string(),
            first_name: yup.string(),
            last_name: yup.string(),
            email: yup.string().email(),
        });

        return editUserScheme.validate(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const editEventValidateBody = (data: UserEditType) => {
    try {
        const editUserScheme = yup.object().shape({
            id: yup.number().required().positive().integer(),
            name: yup.string(),
            resume: yup.string(),
            description: yup.string(),
            type: yup.string(),
            category: yup.string(),
            eventImageSmall: yup.string(),
            eventImageBig: yup.string(),
            localization: yup.string(),
            eventDate: yup.string(),
        });

        return editUserScheme.validate(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const newEventValidateBody = (data: UserEditType) => {
    try {
        const editUserScheme = yup.object().shape({
            name: yup.string().required("name is required"),
            resume: yup.string().required("resume is required"),
            description: yup.string(),
            type: yup.string().required("type is required"),
            category: yup.string(),
            eventImageSmall: yup.string().required("eventImageSmall is required"),
            eventImageBig: yup.string().required("eventImageBig is required"),
            localization: yup.string().required("localization is required"),
            eventDate: yup.string().required("eventDate is required"),
        });

        return editUserScheme.validate(data)
    } catch (error) {
        console.log(error.message)
    }
}
export const joinEventValidate = (data: UserType) => {
    try {
        const joinEventScheme = yup.object().shape({
            user_id: yup.string().required(),
            event_id: yup.string().required(),
        });
        return joinEventScheme.validate(data)
    } catch (error) {
        console.log(error.message)
    }
}
