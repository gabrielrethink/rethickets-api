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
export const findAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await knex.select('*').from('events')
    res.locals.data = events;
    next();
  } catch (error) {
    errorHandler(error, res, next)
  }
};

// GET = Find User By ID
export const findEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await knex.select('*').from('events').where({ id: req.params.id }).first()
    if (!event) {
      throw new Error("Can't find this Event");
    }
    res.locals.data = event;
    next();
  } catch (error) {
    errorHandler(error, res, next)
  }
};

// POST = Create User
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = req.body

    const newEvent = await knex('event').insert(event)
    res.locals.data = { eventId: newEvent[0] };
    res.locals.status = httpStatus.CREATED
    res.locals.message = httpStatus[httpStatus.CREATED]
    next();

  } catch (error) {
    errorHandler(error, res, next)
  }
}

// PATCH = Edit a user data

export const editEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const event = await knex.select('*').from('events').where({ id: req.params.id }).first()
    if (!event) {
      throw new Error("Can't Find User");
    }

    const updatedEvent = await knex
      .from("users")
      .update(req.body)
      .where("id", event.id);

    res.locals.data = { user: updatedEvent };
    next();

  } catch (error) {
    errorHandler(error, res, next)
  }
};

// DELETE = Delete a user

export const deleteEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await knex.delete().from('events').where({ id: req.params.id }).first()
    res.locals.data = { event };
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
