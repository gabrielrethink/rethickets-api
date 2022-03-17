import { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: `${__dirname}/src/database/dev.sqlite3`,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};

export default config;