import knex from "../database";
import Utils from "../utils";

// GET = All users
const findAllUser = async () => {
  const user = await knex.select("*").from("users");
  return user;
};

// GET = Find User By ID
const findUserById = async (id: any) => {
  const user = await knex.select("*").from("users").where({ id }).first();
  return user;
};

// POST = Create User
const createUser = async ({
  username,
  first_name,
  last_name,
  password,
  email,
}) => {
  try {
    const hashPassword = await Utils.hashPassword(password);
    const isValidEmail = Utils.isValidEmail(email);
    if (isValidEmail) {
      throw new Error("Email invalido");
    }

    const user = {
      username,
      first_name,
      last_name,
      password: hashPassword,
      email,
      avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
    };
    const newUser = await knex("users").insert(user);
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

// PATCH = Edit a user data

const editUser = async (
  { username, first_name, last_name, password, email },
  id
) => {
  const user = await knex.select("*").from("users").where({ id }).first();
  const validate = /(?<NomeDeEmail>[\w+\.]+\w+)@(?<Dominio>rethink.dev$)/;
  if (!email.match(validate)) {
    throw new Error("Email invalido");
  }
  if (user) {
    const hashPassword = password
      ? await Utils.hashPassword(password)
      : undefined;
    const updatedUser = await knex
      .from("users")
      .update({
        username: username ? username : user.username,
        first_name: first_name ? first_name : user.first_name,
        last_name: last_name ? last_name : user.last_name,
        email: email ? email : user.email,
        password: password ? hashPassword : user.password,
      })
      .where("id", user.id);

    return updatedUser;
  }
};

// DELETE = Delete a user

const deleteUserById = async (id: string) => {
  const user = await knex.delete().from("users").where({ id }).first();
  return user;
};

// POST = Create User
const joinEvent = async ({
  user_id, event_id
}) => {
  try {
    const userJoinEvent = await knex('users_events').insert({ user_id, event_id })
    return userJoinEvent
  } catch (error) {
    console.log(error.message)
  }
};

export default {
  findAllUser, findUserById, createUser, editUser, deleteUserById, joinEvent
}
