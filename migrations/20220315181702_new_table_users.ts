import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments()
        table.string('username');
        table.string('email');
        table.string('first_name');
        table.string('last_name');
        table.string('password');
        table.string('avatar');
        table.boolean('admin').defaultTo(false);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}