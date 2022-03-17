import bcrypt from "bcrypt";
import knex from "../database";

const jwt = require("jsonwebtoken");

const authentication = async ({ username, password }) => {
  try {
    const user = await knex
      .select("password", "username", "id")
      .from("users")
      .where({ username })
      .first();

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) throw new Error("Wrong Password");

    const data = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token: jwt.sign(
        {
          user_id: user.id,
          exp: Date.now() / 1000 + 86400,
        },
        process.env.TOKEN_SECRET
      ),
    };
  } catch (error) {
    console.log(error);
  }

  return;
};
