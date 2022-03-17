import { Request, Response, NextFunction } from "express";
import httpStatus from 'http-status';
import utils from "../utils/index";
import knex from "../database";

const errorHandler = (error: any, res: Response, next: NextFunction) => {
  console.log(error)
  res.locals.status = 500;
  res.locals.message = error.message;
  next();
}

// GET = All users
export const findAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await knex.select('*').from('users')
    res.locals.data = user;
    next();
  } catch (error) {
    errorHandler(error, res, next)
  }
};

// GET = Find User By ID
export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await knex.select('*').from('users').where({ id: req.params.id }).first()
    if (!user) {
      throw new Error("Can't find this user");
    }
    res.locals.data = user;
    next();
  } catch (error) {
    errorHandler(error, res, next)
  }
};

// POST = Create User
export const createUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { username,
      firstName: first_name,
      lastName: last_name,
      password,
      email } = req.body

    // const hashPassword = await bcrypt.hash(password, 10);
    const hashPassword = utils.hashPassword(password)

    if (!email.match(utils.isValidEmail(email))) {
      throw new Error("Email invalido");
    }

    const user = {
      ...req.body,
      password: hashPassword,
      avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`
    }

    const newUser = await knex('users').insert(user)
    res.locals.data = { userId: newUser[0] };
    res.locals.status = httpStatus.CREATED
    res.locals.message = httpStatus[httpStatus.CREATED]
    next();

  } catch (error) {
    errorHandler(error, res, next)
  }
}

// PATCH = Edit a user data

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username,
      firstName: first_name,
      lastName: last_name,
      password,
      email } = req.body

    const user = await knex.select('*').from('users').where({ id: req.params.id }).first()
    if (!user) {
      throw new Error("Can't Find User");
    }
    if (!email.match(utils.isValidEmail(email))) {
      throw new Error("Email invalido");
    }

    const hashPassword = password ? utils.hashPassword(password) : undefined

    const updatedUser = await knex
      .from("users")
      .update({
        username: username ? username : user.username,
        first_name: first_name ? first_name : user.first_name,
        last_name: last_name ? last_name : user.last_name,
        email: email ? email : user.email,
        password: password ? hashPassword : user.password
      })
      .where("id", user.id);

    res.locals.data = { user: updatedUser };
    next();

  } catch (error) {
    errorHandler(error, res, next)

  }
};

// DELETE = Delete a user

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await knex.delete().from('users').where({ id: req.params.id }).first()
    res.locals.data = { user };
    next();

  } catch (error) {
    errorHandler(error, res, next)

  }
};

// POST = User Join Event
export const joinEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userJoinEvent = await knex('users_events').insert({ user_id: req.body.userId, event_id: req.body.event_id })
    res.locals.data = { event: userJoinEvent };
    next();

  } catch (error) {
    errorHandler(error, res, next)

  }
};
