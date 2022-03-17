import knexConfig from "../../knexfile";
const knex = require("knex")(knexConfig[process.env.ENVIROMENT]);

export default knex;
